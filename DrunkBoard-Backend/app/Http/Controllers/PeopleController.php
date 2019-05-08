<?php

namespace App\Http\Controllers;

use App\Person;
use DateTime;
use ErrorException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PeopleController extends Controller {

    // See constructor
    private static $allowedOrder;
    private static $filters;

    public function __construct() {
        // Set static fields to a computed value.

        // Set allowed order bys
        if (is_null(static::$allowedOrder)) {
            static::$allowedOrder = array_flip([
                'id', 'fname', 'lname', 'country', 'avg_vote', 'date'
            ]);

            static::$allowedOrder = [
                'id' => 'id',
                'fname' => 'first_name',
                'lname' => 'last_name',
                'country' => 'country_iso',
                'avg_vote' => 'avg_vote',
                'date' => 'created_at'
            ];
        }

        // Set available filters
        if (is_null(static::$filters)) {
            static::$filters = [
                // Filter by name, match if $name is the start of one of the names of the person
                'name' => function (Builder $query, string $name) {
                    // TODO better sanitization ?
                    $name = htmlspecialchars($name, ENT_QUOTES);
                    $query->where('first_name', 'LIKE', $name . '%')
                        ->orWhere('last_name', 'LIKE', $name . '%');
                },

                // Filter by country, match the exact country code
                'country' => function (Builder $query, string $iso) {
                    $query->where('country_iso', $iso);
                },

                // Filter by min/max of alcohol
                'alcohol' => function (Builder $query, float $min = null, float $max = null) {
                    if (!is_null($min)) $query->where('alcohol', '>=', $min);
                    if (!is_null($max)) $query->where('alcohol', '<', $max);
                },

                // Filter by min/max of vote
                'vote_avg' => function (Builder $query, int $min = null, int $max = null) {
                    if (!is_null($min)) $query->where('avg_vote', '>=', $min);
                    if (!is_null($max)) $query->where('avg_vote', '<', $max);
                },

                // Filter by not older/younger than
                'date' => function (Builder $query, int $timestampStart = null, int $timestampEnd = null) {
                    if (!is_null($timestampStart)) {
                        $time = new DateTime('@' . $timestampStart);
                        $query->where('created_at', '>=', $time);
                    }
                    if (!is_null($timestampEnd)) {
                        $time = new DateTime('@' . $timestampEnd);
                        $query->where('created_at', '<=', $time);
                    }
                }
            ];
        }
    }

    /**
     * Get everyone.
     *
     * @return JsonResponse
     */
    public function get() {
        $persons = $this->mutateAny(Person::all());

        return $this->respond(Response::HTTP_OK, $persons->toArray());
    }

    /**
     * Get by id.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getOne(int $id) {
        $person = Person::find($id);

        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        }

        return $this->respond(Response::HTTP_OK, $person->mutateToArray());
    }

    /**
     * Hand-crafted pagination.
     * Paginate the people and apply some ordering and/or filters.
     * ?amount => amount of results per page.
     * ?page => page number.
     * ?order => the field to use when sorting, can be prefixed by a '!' to reverse the sort.
     * ?filters => the filters to apply, comma-separated, each filter has his name and each arguments separated by a '|'.
     *
     * Ex: /?amount=10&page=3&order=fname&filters=country|FR,alcohol||2
     * This set of parameters will take only people from franc with lower that 2 alcohol, order them by first name,
     * skip the 20 first of them and return the 10 following.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function paginate(Request $request) {
        /*
         * Setup
         *
         * $page     - Page number
         * $amount   - Amount of items per page
         * $order    - Column to use to sort everyone, a ! in the first pos is for DESC
         * $filters  - Comma-separated filters with name and arguments |-separated
         */

        $page = +$request->query('page', 1) - 1; // 0-based
        $amount = +$request->query('amount', 50);

        // Filter allowed orders
        /*$orderBy = $request->query('order');
        if (isset($orderBy) && !isset(static::$allowedOrder[$orderBy])) {
            $orderBy = null;
        }*/
        $orderBy = null;
        $orderDirection = 'ASC';
        if ($request->has('order')) {
            $orderBy = $request->query('order');

            // Reverse marker
            if ($orderBy[0] === '!') {
                $orderDirection = 'DESC';
                $orderBy = substr($orderBy, 1);
            }

            $orderBy = isset(static::$allowedOrder[$orderBy])
                ? static::$allowedOrder[$orderBy] : null;
        }

        // Parse filters
        $filters = $request->has('filters') ? explode(',', $request->query('filters', '')) : [];
        //dd($filters);

        /* Query */

        // Prepare query
        $query = DB::table('people_vote_view');

        // Apply filters
        foreach ($filters as $rawFilterArgs) {
            try {
                // Get filter name
                list($name, $args) = explode('|', $rawFilterArgs, 2);

                // Check if filter exists
                if (!isset(static::$filters[$name]))
                    continue;

                // Get filter and prepare args
                $filter = static::$filters[$name];
                $args = array_merge([$query], explode('|', $args));

                // Replace empty parameters to null
                $args = array_replace($args,
                    array_fill_keys(array_keys($args, ''), null)
                );

                // Call filter
                call_user_func_array($filter, $args);

            } catch (ErrorException $e) { // The only errors that can appear are due to input malformation
                return $this->respond(Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        // Apply order
        if (!is_null($orderBy))
            $query->orderBy($orderBy, $orderDirection);
        else
            $query->orderBy('id');

        // Apply offsets
        $query->skip($page * $amount)
            ->take($amount);

        // Execute query
        $results = $query->get()->all();

        if (count($results) === 0)
            return $this->respond(Response::HTTP_NOT_FOUND);

        return $this->respond(Response::HTTP_OK, $results);
    }

    /**
     * Create a person.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function create(Request $request) {
        $this->validate($request, Person::$rules);

        $person = Person::create($request->all());

        return $this->respond(Response::HTTP_CREATED, $person->mutateToArray());
    }

    /**
     * Edit a person.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     * @throws ValidationException
     */
    public function edit(Request $request, int $id) {
        $this->validate($request, Person::$editRules);

        $person = Person::find($id);
        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        }

        $person->update($request->all());
        return $this->respond(Response::HTTP_OK, $person->mutateToArray());
    }

    /**
     * Delete a person.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id) {
        if (is_null(Person::find($id))) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        }

        Person::destroy($id);
        return $this->respond(Response::HTTP_NO_CONTENT);
    }


    /**
     * Restore a soft deleted model.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function restore(int $id) {
        $person = Person::withTrashed()->find($id);

        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        } elseif (!$person->trashed()) {
            return $this->respond(Response::HTTP_NO_CONTENT);
        }

        $person->restore();
        return $this->respond(Response::HTTP_NO_CONTENT);
    }

    private function mutateAny($any) {
        if ($any instanceof Person) {
            return $any->mutateToArray();

        } elseif ($any instanceof Collection) {
            return $any->map(function (Person $item) {
                return $item->mutateToArray();
            });
        }

        return null;
    }
}

<?php

namespace App\Http\Controllers;

use App\Person;
use DateTime;
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

        if (is_null(static::$allowedOrder)) {
            static::$allowedOrder = array_flip([
                'id', 'fname', 'lname', 'country', 'avg_vote', 'date'
            ]);
        }

        if (is_null(static::$filters)) {
            static::$filters = [
                'name' => function (Builder $query, string $name) {
                    // Sanitize $name somewhere
                    $query->where('first_name', 'LIKE', $name . '%')
                        ->orWhere('last_name', 'LIKE', $name . '%');
                },
                'country' => function (Builder $query, string $iso) {
                    $query->where('country_iso', $iso);
                },
                'alcohol' => function (Builder $query, float $min = null, float $max = null) {
                    if (!is_null($min)) $query->where('alcohol', '>=', $min);
                    if (!is_null($max)) $query->where('alcohol', '<=', $max);
                },
                'vote_avg' => function (Builder $query, int $min = null, int $max = null) {
                    if (!is_null($min)) $query->where('avg_vote', '>=', $min);
                    if (!is_null($max)) $query->where('avg_vote', '<=', $max);
                },
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
     * Paginate everyone with query parameters.
     * ?amount => amount of results per page.
     * ?page => page
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function paginate(Request $request) {
        $amount = $request->query('amount', 50);
        $persons = new Collection(Person::simplePaginate($amount)->items());
        $persons = $this->mutateAny($persons);

        return $this->respond(Response::HTTP_OK, $persons->toArray());
    }

    public function paginateNew(Request $request) {
        /*
         * Setup
         *
         * $page     - Page number
         * $amount   - Amount of items per page
         * $orderBy  - Column to use to sort everyone
         * $filters  - Comma-separated filters with name and arguments |-separated
         */

        $page = +$request->query('page', 1) - 1; // 0-based
        $amount = +$request->query('amount', 50);

        // Filter allowed orders
        $orderBy = $request->query('order');
        if (!in_array($orderBy, static::$allowedOrder)) {
            $orderBy = null;
        }

        // Parse filters
        $filters = explode(',', $request->query('filters'));

        /* Query */

        // Prepare query
        $query = DB::table('people_vote_view');

        // Apply filters
        foreach ($filters as $rawFilterArgs) {
            // Get filter name
            list($name, $args) = explode('|', $rawFilterArgs, 2);
            // Get filter and prepare args
            $filter = static::$filters[$name];
            $args = array_merge([$query], explode('|', $args));

            // Call filter
            call_user_func_array($filter, $args);
        }

        // Apply order
        if (!is_null($orderBy))
            $query->orderBy($orderBy);
        else
            $query->orderBy('id');

        // Apply offsets
        $query->skip($page * $amount)
            ->take($amount);

        // Execute query
        $results = $this->mutateAny($query->get());

        if (count($results) === 0)
            return $this->respond(Response::HTTP_NOT_FOUND);

        return $this->respond(Response::HTTP_OK, $results->toArray());
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

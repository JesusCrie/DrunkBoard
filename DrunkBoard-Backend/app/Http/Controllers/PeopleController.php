<?php

namespace App\Http\Controllers;

use App\Person;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class PeopleController extends Controller {

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

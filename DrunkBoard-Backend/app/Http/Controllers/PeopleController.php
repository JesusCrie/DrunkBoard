<?php

namespace App\Http\Controllers;

use App\Person;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PeopleController extends Controller {

    /**
     * Get everyone.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get() {
        $persons = $this->mutate(Person::all());

        return $this->respond(Response::HTTP_OK, $persons->toArray());
    }

    /**
     * Get by id.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOne(int $id) {
        $person = $this->mutate(Person::find($id));

        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        }

        return $this->respond(Response::HTTP_OK, $person);
    }

    /**
     * Paginate everyone with query parameters.
     * ?amount => amount of results per page.
     * ?page => page
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function paginate(Request $request) {
        $amount = $request->query('amount', 50);
        $persons = new Collection(Person::simplePaginate($amount)->items());
        $persons = $this->mutate($persons);

        return $this->respond(Response::HTTP_OK, $persons->toArray());
    }

    /**
     * Create a person.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function post(Request $request) {
        $this->validate($request, Person::$rules);
        $person = Person::create($request->all());

        return $this->respond(Response::HTTP_CREATED, $person->mutateToArray());
    }

    /**
     * Edit a person.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function put(Request $request, int $id) {
        $this->validate($request, Person::$editRules);

        $person = Person::find($id);
        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        }

        $person->update($request->all());
        return $this->respond(Response::HTTP_OK, $person);
    }

    public function delete(Request $request, int $id) {
        if (is_null(Person::find($id))) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        }

        Person::destroy($id);
        return $this->respond(Response::HTTP_NO_CONTENT);
    }

    private function mutate($any) {
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

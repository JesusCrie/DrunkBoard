<?php

namespace App\Http\Controllers;

use App\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VoteController extends Controller {

    /**
     * Get the rating given to a person.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function get(Request $request, int $id) {
        $person = Person::find($id);

        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        } elseif ($person->canVote($request->ip())) {
            return $this->respond(Response::HTTP_FORBIDDEN);
        }

        $vote = $person->votes()
            ->where('ip', $request->ip())
            ->first();

        return $this->respond(Response::HTTP_OK, ['rating' => $vote->rating]);
    }

    /**
     * Add a vote on a person
     *
     * @param Request $request
     * @param int $id
     * @param int $rating
     * @return JsonResponse
     */
    public function vote(Request $request, int $id, int $rating) {
        $person = Person::find($id);

        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        } elseif (!$person->canVote($request->ip())) {
            return $this->respond(Response::HTTP_FORBIDDEN);
        } elseif ($rating < 0 || $rating > 5) {
            return $this->respond(Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $vote = $person->vote($rating, $request->ip());

        return $this->respond(Response::HTTP_CREATED, $vote->mutateToArray());
    }

    /**
     * Edit a vote for a person.
     *
     * @param Request $request
     * @param int $id
     * @param int $rating
     * @return JsonResponse
     */
    public function edit(Request $request, int $id, int $rating) {
        $person = Person::find($id);

        if (is_null($person))
            return $this->respond(Response::HTTP_NOT_FOUND);
        elseif ($person->canVote($request->ip()))
            return $this->respond(Response::HTTP_FORBIDDEN);
        elseif ($rating < 0 || $rating > 5)
            return $this->respond(Response::HTTP_UNPROCESSABLE_ENTITY);


        $vote = $person->votes()
            ->where('ip', $request->ip())
            ->first();

        $vote->rating = $rating;
        $vote->save();

        return $this->respond(Response::HTTP_OK, ['rating' => $rating]);
    }

    /**
     * Delete a vote for a person.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function delete(Request $request, int $id) {
        $person = Person::find($id);

        if (is_null($person))
            return $this->respond(Response::HTTP_NOT_FOUND);
        elseif ($person->canVote($request->ip()))
            return $this->respond(Response::HTTP_FORBIDDEN);

        $vote = $person->votes()
            ->where('ip', $request->ip())
            ->first();

        $vote->delete();

        return $this->respond(Response::HTTP_NO_CONTENT);
    }
}

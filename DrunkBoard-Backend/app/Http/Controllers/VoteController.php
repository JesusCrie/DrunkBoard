<?php

namespace App\Http\Controllers;

use App\Person;
use App\Vote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class VoteController extends Controller {

    /**
     * Add a vote on a person
     *
     * @param Request $request
     * @param int $id
     * @param int $rating
     * @return JsonResponse
     * @throws ValidationException
     */
    public function vote(Request $request, int $id, int $rating) {
        $this->validate($request, Vote::$rules);

        $person = Person::find($id);
        if (is_null($person)) {
            return $this->respond(Response::HTTP_NOT_FOUND);
        } elseif (!$person->canVote()) {
            return $this->respond(Response::HTTP_FORBIDDEN);
        }

        $vote = Vote::create([
            'person_id' => $id,
            'ip' => $request->ip(),
            'rating' => $rating
        ]);

        return $this->respond(Response::HTTP_CREATED, $vote);
    }
}

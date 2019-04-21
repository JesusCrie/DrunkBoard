<?php

namespace App\Http\Controllers;

use App\Person;
use App\Vote;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VoteController extends Controller {

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

        return $this->respond(Response::HTTP_OK, $vote);
    }
}

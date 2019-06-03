<?php


use App\Person;
use App\Vote;

class DBDump extends TestCase {

    public function testDump() {
        $users = factory(Person::class, 100)->state('withCountry')->create();
        $votes = factory(Vote::class, 1000)->create();

        $userJson = $users->map(function (Person $user) {
            return $user->mutateToArray();
        })->toJson();

        $this->assertJson($userJson);

        echo($userJson);
    }
}

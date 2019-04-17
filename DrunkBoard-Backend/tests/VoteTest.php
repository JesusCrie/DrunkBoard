<?php

use Laravel\Lumen\Testing\DatabaseMigrations;

class VoteTest extends TestCase {

    use DatabaseMigrations;

    public function testCanVote() {
        $person = factory(App\Person::class)->create();
        $vote = factory(App\Vote::class)->make();

        $this->assertTrue($person->canVote($vote->ip));
    }

    public function testVoteIpBlackList() {
        $person = factory(App\Person::class)->create();
        $vote = factory(App\Vote::class)->create();

        $this->assertFalse($person->canVote($vote->ip));
    }

    public function testVoteDelete() {
        $person = factory(App\Person::class)->create();
        $vote = factory(App\Vote::class)->create();

        $this->assertFalse($person->canVote($vote->ip));

        $vote->delete();

        $this->assertTrue($person->canVote($vote->ip));
    }

    public function testIpv6Combined() {
        $person = factory(App\Person::class)->create();
        $vote = factory(App\Vote::class)->state('ipv6')->make();

        $this->assertTrue($person->canVote($vote->ip));

        $vote->save();
        $vote->refresh();

        $this->assertFalse($person->canVote($vote->ip));

        $vote->delete();

        $this->assertTrue($person->canVote($vote->ip));
    }
}

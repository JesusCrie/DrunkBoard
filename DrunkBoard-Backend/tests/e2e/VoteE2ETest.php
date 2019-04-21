<?php


use App\Person;

class VoteE2ETest extends TestCase {

    private static $mockIpPrimary = '77.136.87.114';
    private static $mockIpSecondary = '135.56.88.167';

    // Add vote endpoint body

    public function testAddVote() {
        $person = factory(Person::class)->create();

        $this->assertTrue($person->canVote(static::$mockIpPrimary));
        $this->assertTrue($person->canVote(static::$mockIpSecondary));

        $this->ipJson('POST', '/person/1/vote/4', static::$mockIpPrimary);

        $person->refresh();
        $this->assertFalse($person->canVote(static::$mockIpPrimary));
        $this->assertTrue($person->canVote(static::$mockIpSecondary));
        $this->assertEquals(4, $person->averageVotes());
    }

    public function testAddVoteOnce() {
        $person = factory(Person::class)->create();

        $this->ipJson('POST', '/person/1/vote/4', static::$mockIpPrimary);

        $person->refresh();
        $this->assertEquals(4, $person->averageVotes());

        $this->ipJson('POST', '/person/1/vote/4', static::$mockIpPrimary);

        $person->refresh();
        $this->assertEquals(4, $person->averageVotes());
    }

    public function testAddVoteMultiple() {
        $person = factory(Person::class)->create();

        $this->ipJson('POST', '/person/1/vote/3', static::$mockIpPrimary);
        $this->ipJson('POST', '/person/1/vote/4', static::$mockIpSecondary);

        $person->refresh();
        $this->assertEquals(3.5, $person->averageVotes());
    }

    // Add vote endpoint status

    public function testAddVoteStatusSuccess() {
        factory(Person::class)->create();

        $res = $this->ipJson('POST', '/person/1/vote/3', static::$mockIpPrimary);
        $this->assertEquals(201, $res->status());
    }

    public function testAddVoteStatusAlreadyVote() {
        $person = factory(Person::class)->create();
        $person->vote(3, static::$mockIpPrimary);

        $res = $this->ipJson('POST', '/person/1/vote/3', static::$mockIpPrimary);
        $this->assertEquals(403, $res->status());
    }

    public function testAddVoteStatusNotFound() {
        $res = $this->ipJson('POST', '/person/1/vote/3', static::$mockIpPrimary);
        $this->assertEquals(404, $res->status());
    }

    // Edit vote endpoint body

    // TODO

    // Edit vote endpoint status

    // TODO

    // Delete vote endpoint body

    // TODO

    // Delete vote endpoint status

    // TODO

    // Utils

    private function ipJson(string $method, string $uri, string $ip = null, array $data = null) {
        return $this->call($method, $uri, [], [], [], ['REMOTE_ADDR' => $ip], $data ? json_encode($data) : []);
    }
}

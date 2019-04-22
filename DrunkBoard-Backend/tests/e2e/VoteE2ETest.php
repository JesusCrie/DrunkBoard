<?php


use App\Person;
use Laravel\Lumen\Testing\DatabaseMigrations;

class VoteE2ETest extends TestCase {

    use DatabaseMigrations;

    private static $mockIpPrimary = '78.136.87.114';
    private static $mockIpSecondary = '135.56.88.167';

    // Add vote endpoint body

    public function testAddVote() {
        $person = factory(Person::class)->create();

        $this->assertTrue($person->canVote(static::$mockIpPrimary));
        $this->assertTrue($person->canVote(static::$mockIpSecondary));

        $this->ipJson('POST', '/person/1/vote/4', static::$mockIpPrimary)
            ->seeJsonEquals([
                'id' => 1,
                'person_id' => 1,
                'rating' => 4
            ]);

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

        $this->ipJson('POST', '/person/1/vote/5', static::$mockIpPrimary);
        $this->assertTrue($this->response->isClientError());

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

        $this->ipJson('POST', '/person/1/vote/3', static::$mockIpPrimary);
        $this->seeStatusCode(201);
    }

    public function testAddVoteStatusNotFound() {
        $this->ipJson('POST', '/person/1/vote/3', static::$mockIpPrimary);
        $this->seeStatusCode(404);
    }

    public function testAddVoteStatusAlreadyVote() {
        $person = factory(Person::class)->create();
        $person->vote(3, static::$mockIpPrimary);

        $this->ipJson('POST', '/person/1/vote/3', static::$mockIpPrimary);
        $this->seeStatusCode(403);
    }

    public function testAddVoteStatusOutOfRange() {
        factory(Person::class)->create();

        $this->ipJson('POST', '/person/1/vote/6', static::$mockIpPrimary);
        $this->seeStatusCode(422);
    }

    // Get vote endpoint body

    public function testGetVote() {
        $person = factory(Person::class)->create();
        $person->vote(3, static::$mockIpPrimary);

        $this->ipJson('GET', '/person/1/vote', static::$mockIpPrimary)
            ->seeJsonEquals([
                'rating' => 3
            ]);
    }

    // Get vote endpoint status

    public function testGetVoteStatusSuccess() {
        $person = factory(Person::class)->create();
        $person->vote(3, static::$mockIpPrimary);

        $this->ipJson('GET', '/person/1/vote', static::$mockIpPrimary);
        $this->seeStatusCode(200);
    }

    public function testGetVoteStatusNotFound() {
        $this->ipJson('GET', '/person/1/vote', static::$mockIpPrimary);
        $this->seeStatusCode(404);
    }

    public function testGetVoteStatusNoVote() {
        factory(Person::class)->create();

        $this->ipJson('GET', '/person/1/vote', static::$mockIpPrimary);
        $this->seeStatusCode(403);
    }

    // Edit vote endpoint body

    public function testEditVote() {
        $person = factory(Person::class)->create();
        $vote = $person->vote(3, static::$mockIpPrimary);

        $this->assertEquals(3, $vote->rating);

        $this->ipJson('PUT', '/person/1/vote/4', static::$mockIpPrimary)
            ->seeJsonEquals([
                'rating' => 4
            ]);

        $vote->refresh();
        $this->assertEquals(4, $vote->rating);
    }

    public function testEditVoteOutOfRange() {
        $person = factory(Person::class)->create();
        $vote = $person->vote(3, static::$mockIpPrimary);

        $this->assertEquals(3, $vote->rating);

        $this->ipJson('PUT', '/person/1/vote/15', static::$mockIpPrimary);
        $this->assertTrue($this->response->isClientError());

        $vote->refresh();
        $this->assertEquals(3, $vote->rating);
    }

    // Edit vote endpoint status

    public function testEditVoteStatusSuccess() {
        $person = factory(Person::class)->create();
        $person->vote(3, static::$mockIpPrimary);

        $this->ipJson('PUT', '/person/1/vote/5', static::$mockIpPrimary);
        $this->seeStatusCode(200);
    }

    public function testEditVoteStatusNotFound() {
        $this->ipJson('PUT', '/person/1/vote/5', static::$mockIpPrimary);
        $this->seeStatusCode(404);
    }

    public function testEditVoteStatusNoVote() {
        factory(Person::class)->create();

        $this->ipJson('PUT', '/person/1/vote/3', static::$mockIpPrimary);
        $this->seeStatusCode(403);
    }

    // Delete vote endpoint body

    public function testDeleteVote() {
        $person = factory(Person::class)->create();
        $person->vote(3, static::$mockIpPrimary);
        $person->vote(4, static::$mockIpSecondary);

        $this->assertFalse($person->canVote(static::$mockIpPrimary));
        $this->assertFalse($person->canVote(static::$mockIpSecondary));

        $this->ipJson('DELETE', '/person/1/vote', static::$mockIpPrimary);

        $this->assertTrue($person->canVote(static::$mockIpPrimary));
        $this->assertFalse($person->canVote(static::$mockIpSecondary));
    }

    // Delete vote endpoint status

    public function testDeleteVoteStatusSuccess() {
        $person = factory(Person::class)->create();
        $person->vote(3, static::$mockIpPrimary);

        $this->ipJson('DELETE', '/person/1/vote', static::$mockIpPrimary);
        $this->seeStatusCode(204);
    }

    public function testDeleteVoteStatusNotFound() {
        $this->ipJson('DELETE', '/person/1/vote', static::$mockIpPrimary);
        $this->seeStatusCode(404);
    }

    public function testDeleteVoteStatusNoVote() {
        factory(Person::class)->create();

        $this->ipJson('DELETE', '/person/1/vote', static::$mockIpPrimary);
        $this->seeStatusCode(403);
    }

    // Utils

    /**
     * Rewrite of MakesHttpRequests#json to support ip mocking.
     *
     * @param string $method
     * @param string $uri
     * @param string|null $ip
     * @param array|null $data
     * @return $this
     */
    private function ipJson(string $method, string $uri, string $ip = null, array $data = null) {
        $content = json_encode($data);

        $headers = [
            'Content-Length' => mb_strlen($content, '8bit'),
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ];

        $server = array_merge(
            $this->transformHeadersToServerVars($headers),
            ['REMOTE_ADDR' => $ip]
        );

        $this->call($method, $uri, [], [], [], $server, $content);

        return $this;
    }
}

<?php

use App\Person;
use Illuminate\Support\Str;
use Laravel\Lumen\Testing\DatabaseMigrations;

class PersonE2ETest extends TestCase {

    use DatabaseMigrations;

    // Get endpoints body

    public function testGetAll() {
        $persons = factory(Person::class, 5)->create();

        $this->json('GET', '/person')
            ->seeJson($persons[0]->mutateToArray())
            ->seeJson($persons[4]->mutateToArray());
    }

    public function testGetById() {
        $person = factory(Person::class)->create();

        $this->json('GET', '/person/1')
            ->seeJsonEquals($person->mutateToArray());
    }

    public function testGetByIdFail() {
        factory(Person::class)->create();

        $this->json('GET', '/person/2')
            ->seeJsonEquals([]);
    }

    // Get endpoints status

    public function testGetAllStatus() {
        $this->json('GET', '/person');
        $this->assertResponseOk();

        factory(Person::class)->create();

        $this->json('GET', '/person')->response;
        $this->assertResponseOk();
    }

    public function testGetByIdStatus() {
        factory(Person::class)->create();

        $this->json('GET', '/person/1');
        $this->assertResponseOk();

        $this->json('GET', '/person/2');
        $this->assertResponseStatus(404);
    }

    // Create endpoints body

    public function testCreateManual() {
        $person = factory(Person::class)->create();
        $person->refresh();

        $this->seeInDatabase('people', ['id' => $person->id]);
    }

    public function testCreatePost() {
        $data = [
            'first_name' => 'First name',
            'last_name' => 'Last name',
            'country_iso' => 'FR',
            'alcohol' => 2.5,
            'story' => Str::random()
        ];

        $this->json('POST', '/person', $data);

        $this->seeInDatabase('people', $data);
    }

    public function testCreatePostNoLastNameNoCountry() {
        $this->json('POST', '/person', [
            'first_name' => 'First name',
            'alcohol' => 3,
            'story' => 'Lorem ipsum dolor sit amet.'
        ])->seeJson([
            'first_name' => 'First name',
            'last_name' => null,
            'alcohol' => 3,
            'country_iso' => null,
            'story' => 'Lorem ipsum dolor sit amet.'
        ]);

        $this->json('GET', '/person/1', [])
            ->seeJson([
                'first_name' => 'First name',
                'last_name' => null,
                'alcohol' => 3,
                'country_iso' => null,
                'story' => 'Lorem ipsum dolor sit amet.'
            ]);
    }

    public function testCreateErroredValidation() {
        $data = [];

        $data['first_name'] = null;
        $data['country_iso'] = 'a';
        $data['story'] = 'Hey';

        $this->json('POST', '/person', $data)
            ->seeJsonStructure([
                'first_name',
                'country_iso',
                'alcohol'
            ]);
    }

    public function testCreateFailEmpty() {
        $this->json('POST', '/person', [])
            ->seeJsonStructure([
                'first_name',
                'alcohol',
                'story'
            ]);
    }

    public function testCreateFailWrongIso() {
        $data = [
            'first_name' => 'Hey',
            'country_iso' => 'a',
            'alcohol' => 1,
            'story' => 'Lorem'
        ];

        $checkFail = function (array $data) {
            $this->json('POST', '/person', $data)
                ->seeJsonStructure(['country_iso']);
        };

        $checkFail($data);

        $data['country_iso'] = 'AAA';
        $checkFail($data);

        $data['country_iso'] = 'aa';
        $checkFail($data);

        $data['country_iso'] = 'FR';
        $this->json('POST', '/person', $data)
            ->seeJsonStructure(['id'])
            ->seeJson([
                'country_iso' => 'FR'
            ]);
    }

    public function testCreateFailWrongAlcohol() {
        $data = [
            'first_name' => 'Hey',
            'alcohol' => null,
            'story' => 'Lorem'
        ];

        $checkFail = function (array $data) {
            $this->json('POST', '/person', $data)
                ->seeJsonStructure(['alcohol']);
        };

        $checkFail($data);

        $data['alcohol'] = 'a';
        $checkFail($data);

        $data['alcohol'] = 5.3;
        $this->json('POST', '/person', $data)
            ->seeJsonStructure(['id'])
            ->seeJson(['alcohol' => 5.3]);
    }

    // Create endpoints status

    public function testCreateStatusSuccess() {
        $this->json('POST', '/person', [
            'first_name' => 'First',
            'alcohol' => 1,
            'story' => 'Lorem'
        ]);

        $this->assertResponseStatus(201);
    }

    public function testCreateStatusFailed() {
        $this->json('POST', '/person', []);

        $this->assertResponseStatus(422);
    }

    // Pagination endpoint body

    public function testPaginate() {
        factory(Person::class, 20)->create();

        $this->json('GET', '/person/paginate?amount=5')
            ->seeJson(['id' => 1])
            ->seeJson(['id' => 2])
            ->seeJson(['id' => 3])
            ->seeJson(['id' => 4])
            ->seeJson(['id' => 5])
            ->dontSeeJson(['id' => 6]);

        $this->json('GET', '/person/paginate?page=1&amount=5')
            ->seeJson(['id' => 1])
            ->dontSeeJson(['id' => 6]);

        $this->json('GET', '/person/paginate?page=2&amount=5')
            ->dontSeeJson(['id' => 2])
            ->dontSeeJson(['id' => 5])
            ->seeJson(['id' => 6])
            ->seeJson(['id' => 10])
            ->dontSeeJson(['id' => 11]);
    }

    public function testPaginateDefaultAmount() {
        factory(Person::class, 60)->create();

        $this->json('GET', '/person/paginate')
            ->seeJson(['id' => 1])
            ->seeJson(['id' => 50])
            ->dontSeeJson(['id' => 51]);

        $this->json('GET', '/person/paginate?&page=2')
            ->dontSeeJson(['id' => 50])
            ->seeJson(['id' => 51]);
    }

    public function testPaginateOutOfBounds() {
        factory(Person::class, 5)->create();

        $this->json('GET', '/person/paginate?page=2&amount=5')
            ->seeJsonEquals([]);
    }

    // Pagination endpoint status

    public function testPaginateStatusSuccess() {
        factory(Person::class, 5)->create();

        $this->json('GET', '/person/paginate');

        $this->assertResponseOk();
    }

    // Edit endpoint body

    public function testEdit() {
        $person = factory(Person::class)->create(['alcohol' => 4]);
        $person->refresh();

        $this->assertNull($person->country_iso);
        $this->assertEquals(4, $person->alcohol);

        $this->json('PUT', '/person/1', [
            'first_name' => $person->first_name,
            'last_name' => $person->last_name,
            'country_iso' => 'FR',
            'alcohol' => 5
        ])->seeJson([
            'id' => 1,
            'country_iso' => 'FR',
            'alcohol' => 5
        ]);

        $person->refresh();

        $this->assertEquals('FR', $person->country_iso);
        $this->assertEquals(5, $person->alcohol);
    }

    // Edit endpoint status

    public function testEditStatusNotFound() {
        $this->json('PUT', '/person/1', []);
        $this->assertResponseStatus(404);
    }

    public function testEditStatusSuccess() {
        factory(Person::class)->create();

        $this->json('PUT', '/person/1', ['country_iso' => 'FR']);
        $this->assertResponseOk();
    }

    public function testEditStatusFailed() {
        factory(Person::class)->create();

        $this->json('PUT', '/person/1', ['country_iso' => 'a']);
        $this->assertResponseStatus(422);
    }

    // Delete endpoint

    public function testDelete() {
        $person = factory(Person::class)->create();

        $this->json('DELETE', '/person/1');

        $person->refresh();
        $this->assertTrue($person->trashed());
    }

    // Delete endpoint status

    public function testDeleteStatusSuccess() {
        factory(Person::class)->create();

        $this->json('DELETE', '/person/1');
        $this->assertResponseStatus(204);
    }

    public function testDeleteStatusNotFound() {
        $this->json('DELETE', '/person/1');
        $this->assertResponseStatus(404);
    }

    // Restore endpoint

    public function testRestore() {
        $person = factory(Person::class)->create();
        $person->delete();

        $this->json('POST', '/person/restore/1');

        $person->refresh();
        $this->assertFalse($person->trashed());
    }

    public function testRestoreIgnoreExistent() {
        $person = factory(Person::class)->create();

        $this->json('POST', '/person/restore/1');

        $person->refresh();
        $this->assertFalse($person->trashed());
    }

    // Restore endpoint status

    public function testRestoreStatusSuccess() {
        $person = factory(Person::class)->create();
        $person->delete();

        $this->json('POST', '/person/restore/1');
        $this->assertResponseStatus(204);
    }

    public function testRestoreStatusNotFound() {
        $this->json('POST', '/person/restore/1');
        $this->assertResponseStatus(404);
    }
}

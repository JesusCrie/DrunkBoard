<?php

use App\Person;
use Illuminate\Support\Str;
use Laravel\Lumen\Testing\DatabaseMigrations;

class PersonE2ETest extends TestCase {

    use DatabaseMigrations;

    public function testManualPerson() {
        $person = factory(Person::class)->create();
        $person->refresh();

        $this->json('GET', '/person/' . $person->id, [])
            ->seeJson([
                'id' => $person->id,
                'first_name' => $person->first_name,
                'last_name' => $person->last_name,
                'country_iso' => $person->country_iso,
                'alcohol' => $person->alcohol,
                'story' => $person->story
            ]);
    }

    public function testCreatePerson() {
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

    public function testCreatePersonNoLastNameNoCountry() {
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

    public function testPaginate() {
        $persons = factory(Person::class, 20)->create();

        $this->json('GET', '/person/paginate?amount=5')
            ->seeJson([
                'id' => 1
            ])
            ->seeJson([
                'id' => 2
            ])
            ->seeJson([
                'id' => 3
            ])
            ->seeJson([
                'id' => 4
            ])
            ->seeJson([
                'id' => 5
            ])
            ->dontSeeJson([
                'id' => 6
            ]);

        $this->json('GET', '/person/paginate?page=1&amount=5')
            ->seeJson([
                'id' => 1
            ])
            ->dontSeeJson([
                'id' => 6
            ]);

        $this->json('GET', '/person/paginate?page=2&amount=5')
            ->dontSeeJson([
                'id' => 2
            ])
            ->dontSeeJson([
                'id' => 5
            ])
            ->seeJson([
                'id' => 6
            ])
            ->seeJson([
                'id' => 10
            ])
            ->dontSeeJson([
                'id' => 11
            ]);
    }

    public function testEditPerson() {
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
}

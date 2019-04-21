<?php

use App\Person;
use Laravel\Lumen\Testing\DatabaseMigrations;

class PersonTest extends TestCase {

    use DatabaseMigrations;

    public function testPersonDefault() {
        $person = factory(Person::class)->create();
        $person->refresh();

        $this->assertNull($person->country_iso);

        $this->seeInDatabase('people', [
            'id' => $person->id
        ]);
    }

    public function testPersonName() {
        $person = factory(Person::class)->states(['withCountry', 'noLastName'])->create();

        $this->seeInDatabase('people', [
            'first_name' => $person->first_name
        ]);

        $this->seeInDatabase('people', [
            'last_name' => null
        ]);
    }

    public function testPersonMinimal() {
        factory(Person::class)->state('noLastName')->create();

        $this->seeInDatabase('people', [
            'last_name' => null,
        ]);

        $this->seeInDatabase('people', [
            'country_iso' => null
        ]);
    }

    public function testSoftDelete() {
        $person = factory(Person::class)->create();

        $this->seeInDatabase('people', [
            'id' => $person->id
        ]);

        $person->delete();
        $person->refresh();

        $this->assertTrue($person->trashed());

        $this->seeInDatabase('people', [
            'id' => $person->id
        ]);

        $person->restore();
        $person->refresh();

        $this->assertFalse($person->trashed());
    }
}

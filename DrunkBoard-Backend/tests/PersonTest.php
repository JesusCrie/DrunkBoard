<?php

use Laravel\Lumen\Testing\DatabaseMigrations;

class PersonTest extends TestCase {

    use DatabaseMigrations;

    public function testPersonDefault() {
        $person = factory(App\Person::class)->create();
        $person->refresh();

        $this->assertEquals('AA', $person->country_iso);

        $this->seeInDatabase('people', [
            'id' => $person->id
        ]);
    }

    public function testPersonName() {
        $person = factory(App\Person::class)->states(['withCountry', 'noLastName'])->create();

        $this->seeInDatabase('people', [
            'first_name' => $person->first_name
        ]);

        $this->seeInDatabase('people', [
            'last_name' => null
        ]);
    }

    public function testPersonMinimal() {
        $person = factory(App\Person::class)->state('noLastName')->create();

        $this->seeInDatabase('people', [
            'last_name' => null,
        ]);

        $this->seeInDatabase('people', [
            'country_iso' => 'AA'
        ]);
    }

    public function testSoftDelete() {
        $person = factory(App\Person::class)->create();

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

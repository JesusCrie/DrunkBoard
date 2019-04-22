<?php

use App\Person;
use Illuminate\Database\Seeder;

class PeopleSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        factory(Person::class, 20)->state('withCountry')->create();
        factory(Person::class, 4)->states(['noLastName', 'withCountry'])->create();
        factory(Person::class, 5)->create();
    }
}

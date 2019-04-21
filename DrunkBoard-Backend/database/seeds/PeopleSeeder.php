<?php

use Illuminate\Database\Seeder;

class PeopleSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        factory(App\Person::class, 10)->state('withCountry')->create();
        factory(App\Person::class)->state('noLastName')->create();
    }
}

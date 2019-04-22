<?php

use App\Vote;
use Illuminate\Database\Seeder;

class VoteSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        factory(Vote::class, 50)->create();
        factory(Vote::class, 20)->state('ipv6')->create();
    }
}

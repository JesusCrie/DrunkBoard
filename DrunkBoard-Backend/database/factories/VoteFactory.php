<?php /** @noinspection PhpUndefinedVariableInspection */

use App\Person;
use App\Vote;
use Faker\Generator as Faker;

$factory->define(Vote::class, function (Faker $faker) {
    return [
        'person_id' => $faker->randomElement(Person::pluck('id')->toArray()),
        'rating' => $faker->numberBetween(0, 5),
        'ip' => $faker->ipv4
    ];
});

$factory->state(Vote::class, 'ipv6', function (Faker $faker) {
    return [
        'ip' => $faker->ipv6
    ];
});

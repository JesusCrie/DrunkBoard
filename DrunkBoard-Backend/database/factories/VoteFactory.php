<?php /** @noinspection PhpUndefinedVariableInspection */

use Faker\Generator as Faker;

$factory->define(App\Vote::class, function (Faker $faker) {
    return [
        'person_id' => $faker->randomElement(App\Person::pluck('id')->toArray()),
        'rating' => $faker->numberBetween(0, 5),
        'ip' => $faker->ipv4
    ];
});

$factory->state(App\Vote::class, 'ipv6', function (Faker $faker) {
    return [
        'ip' => $faker->ipv6
    ];
});

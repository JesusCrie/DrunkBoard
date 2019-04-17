<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

use Faker\Generator as Faker;

// Person factory

$factory->define(App\Person::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        //'country_iso' => $faker->countryCode,
        'alcohol' => $faker->randomFloat(2, 0, 50),
        'story' => $faker->paragraph,
        'created_at' => $faker->dateTime,
        'updated_at' => $faker->dateTime
    ];
});

$factory->state(App\Person::class, 'withCountry', function (Faker $faker) {
    return [
        'country_iso' => $faker->countryCode
    ];
});

$factory->state(App\Person::class, 'noLastName', [
    'last_name' => null
]);

// Vote factory

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

// BestOf factory

$factory->define(App\BestOf::class, function (Faker $faker) {
    return [
        'person_id' => $faker->randomElement(App\Person::pluck('id')->toArray()),
        'mention' => $faker->sentence(20)
    ];
});

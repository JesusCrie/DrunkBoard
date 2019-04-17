<?php /** @noinspection PhpUndefinedVariableInspection */

use Faker\Generator as Faker;

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

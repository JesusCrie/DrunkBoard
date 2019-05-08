<?php /** @noinspection PhpUndefinedVariableInspection */

use App\Person;
use Faker\Generator as Faker;

$factory->define(Person::class, function (Faker $faker) {
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

$factory->state(Person::class, 'withCountry', function (Faker $faker) {
    return [
        'country_iso' => $faker->countryCode
    ];
});

$factory->state(Person::class, 'noLastName', [
    'last_name' => null
]);

$factory->state(Person::class, 'noDrunk', [
    'alcohol' => 0
]);

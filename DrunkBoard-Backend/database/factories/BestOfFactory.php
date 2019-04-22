<?php /** @noinspection PhpUndefinedVariableInspection */

use App\BestOf;
use Faker\Generator as Faker;

$factory->define(BestOf::class, function (Faker $faker) {
    return [
        'person_id' => $faker->randomElement(App\Person::pluck('id')->toArray()),
        'mention' => $faker->sentence(20)
    ];
});

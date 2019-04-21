<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    abort(404);
});

// Person endpoints
Route::group(['prefix' => 'person'], function () {
    // Resource endpoints
    // Get
    Route::get('/', 'PeopleController@get');
    Route::get('/{id}', 'PeopleController@getOne');
    Route::get('/paginate', 'PeopleController@paginate');

    // Create/edit/delete/restore
    Route::post('/', 'PeopleController@create');
    Route::put('/{id}', 'PeopleController@edit');
    Route::delete('/{id}', 'PeopleController@delete');
    Route::post('/restore/{id}', 'PeopleController@restore');

    // Vote
    Route::post('{id}/vote/{rating}', 'VoteController@vote');
});

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
    Route::get('/', 'PeopleController@get');
    Route::get('/paginate', 'PeopleController@paginate');
    Route::get('/{id}', 'PeopleController@getOne');
    Route::post('/', 'PeopleController@post');
    Route::put('/{id}', 'PeopleController@put');
    Route::delete('/', 'PeopleController@delete');

    // Vote
    Route::post('{id}/vote/{rating}', 'VoteController@vote');
});

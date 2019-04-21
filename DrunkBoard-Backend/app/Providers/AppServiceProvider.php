<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {
        // Validate only uppercase strings
        Validator::extend('uppercase', function ($attribute, $value, $parameters, $validator) {
            return strtoupper($value) === $value;
        });

        // Validate nothing, the attribute must not be there
        Validator::extend('forbidden', function ($attribute, $value, $parameters, $validator) {
            return false;
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() {
        if ($this->app->environment() === 'local') {
            $this->app->register('Wn\Generators\CommandsServiceProvider');
        }
    }
}

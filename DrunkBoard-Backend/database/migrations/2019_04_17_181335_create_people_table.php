<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeopleTable extends Migration {

    public function up() {
        Schema::create('people', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->char('country_iso', 2)->nullable();
            $table->unsignedDecimal('alcohol', 5, 2);
            $table->text('story');

            // Special columns
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down() {
        Schema::drop('people');
    }
}

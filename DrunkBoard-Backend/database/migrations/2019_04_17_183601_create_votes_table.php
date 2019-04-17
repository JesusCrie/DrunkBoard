<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVotesTable extends Migration {

    public function up() {
        Schema::create('votes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('person_id')->unsigned()->index(); // Indexed for fast lookup
            $table->ipAddress('ip')->index(); // Indexed for fast lookup
            $table->smallInteger('rating');

            // Foreign keys
            $table->foreign('person_id')
                ->references('id')
                ->on('people')
                ->onDelete('cascade');
        });
    }

    public function down() {
        Schema::drop('votes');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBestOfsTable extends Migration {

    public function up() {
        Schema::create('best_ofs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('person_id')->unsigned();
            $table->text('mention');

            // Foreign keys
            $table->foreign('person_id')
                ->references('id')
                ->on('people')
                ->onDelete('cascade');

            // Special columns
            $table->softDeletes();
        });
    }

    public function down() {
        Schema::drop('best_ofs');
    }
}

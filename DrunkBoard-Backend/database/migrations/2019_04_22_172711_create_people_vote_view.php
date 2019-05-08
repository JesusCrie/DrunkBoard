<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreatePeopleVoteView extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        DB::statement('
            CREATE OR REPLACE VIEW people_vote_view AS 
            SELECT P.id, P.first_name, P.last_name, P.country_iso, P.alcohol, P.story,
                   COALESCE(V.nb_v, 0) as nb_vote, COALESCE(V.avg_v, 0) as avg_vote,
                   P.created_at
            FROM people P
            LEFT JOIN (
                SELECT V.person_id, COUNT(*) AS nb_v, AVG(rating) AS avg_v
                FROM votes V
                GROUP BY V.person_id
            ) as V ON V.person_id = P.id;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        DB::statement('DROP VIEW people_vote_view;');
        //Schema::dropIfExists('people_vote_view');
    }
}

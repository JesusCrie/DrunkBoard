<?php


use Laravel\Lumen\Testing\DatabaseMigrations;

class BestOfTest extends TestCase {

    use DatabaseMigrations;

    public function testCreateBestOf() {
        $person = factory(App\Person::class)->create();
        $bestOf = factory(App\BestOf::class)->create();

        $this->seeInDatabase('best_ofs', [
            'id' => $bestOf->id
        ]);

        $this->assertEquals($bestOf->person()->first()->id, $person->id);
    }

}

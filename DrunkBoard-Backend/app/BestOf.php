<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class BestOf extends Model {

    protected $fillable = ['person_id', 'mention'];

    protected $dates = [];

    public static $rules = [
        'person_id' => 'bail|required|numeric|exists:persons,id',
        'mention' => 'required'
    ];

    public $timestamps = false;

    // Relationships

    public function person() {
        return $this->belongsTo("App\Person");
    }

    // Utilities

    public function mutateToArray() {
        return [
            'id' => $this->id,
            'person_id' => $this->person_id,
            'mention' => $this->mention
        ];
    }
}

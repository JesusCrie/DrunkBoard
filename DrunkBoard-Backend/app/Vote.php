<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model {

    protected $fillable = ['rating', 'person_id', 'ip'];

    protected $dates = [];

    public static $rules = [
        'person_id' => 'bail|required|numeric|exists:votes',
        'rating' => 'required|numeric|min:0|max:5',
        'ip' => 'forbidden'
    ];

    public static $editRules = [
        'person_id' => 'forbidden',
        'rating' => 'numeric|min:0|max:5',
        'ip' => 'forbidden'
    ];

    public $timestamps = false;

    // Relationships

    public function person() {
        return $this->belongsTo('App\Person');
    }

    // Utilities

    public function mutateToArray() {
        return [
            'id' => $this->id,
            'person_id' => $this->person_id,
            'rating' => $this->rating
        ];
    }
}

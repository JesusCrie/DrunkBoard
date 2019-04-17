<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model {

    protected $fillable = ['rating', 'voter_id'];

    protected $dates = [];

    public static $rules = [
        'person_id' => 'bail|required|numeric|exists:votes',
        'rating' => 'required|numeric|min:0|max:5',
        'ip' => 'required|ip'
    ];

    public $timestamps = false;

    // Relationships

    public function person() {
        return $this->belongsTo('App\Person');
    }
}

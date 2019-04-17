<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Request;

class Person extends Model {

    use SoftDeletes;

    protected $fillable = ['first_name', 'last_name', 'country_iso', 'alcohol', 'story'];

    protected $dates = [];

    public static $rules = [
        'first_name' => 'required',
        'last_name' => 'nullable|string',
        'country_iso' => 'nullable|size:2',
        'alcohol' => 'required|numeric',
        'story' => 'required'
    ];

    // Relationships

    public function votes() {
        return $this->hasMany('App\Vote');
    }

    // Utilities

    public function canVote(string $ip = null) {
        return $this->votes()
            ->where('ip', $ip ?: Request::ip())
            ->doesntExist();
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Request;

class Person extends Model {

    use SoftDeletes;

    protected $fillable = ['first_name', 'last_name', 'country_iso', 'alcohol', 'story'];

    protected $dates = [];

    public static $rules = [
        'first_name' => 'required',
        'last_name' => 'nullable',
        'country_iso' => 'nullable|string|uppercase|size:2',
        'alcohol' => 'required|numeric',
        'story' => 'required'
    ];

    public static $editRules = [
        'country_iso' => 'nullable|string|size:2',
        'alcohol' => 'numeric'
    ];

    // Relationships

    public function votes() {
        return $this->hasMany('App\Vote');
    }

    // Utilities

    /**
     * Check if a provided ip is allowed to vote.
     *
     * @param string|null $ip
     * @return bool
     */
    public function canVote(string $ip = null) {
        return $this->votes()
            ->where('ip', $ip ?: Request::ip())
            ->doesntExist();
    }

    /**
     * Add a vote from the given ip to the current Person and returns it.
     *
     * @param int $rating
     * @param string|null $ip
     * @return Vote
     */
    public function vote(int $rating, string $ip = null) {
        return Vote::create([
            'person_id' => $this->id,
            'rating' => $rating,
            'ip' => $ip ?: Request::ip()
        ]);
    }

    /**
     * Compute the average rating of the Person.
     *
     * @return int
     */
    public function averageVotes() {
        return +$this->votes()
            ->average('rating') ?: 0;
    }

    /**
     * Format the current Person into an API friendly format.
     *
     * @return array
     */
    public function mutateToArray() {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'country_iso' => $this->country_iso,
            'alcohol' => $this->alcohol,
            'story' => $this->story,
            'votes_amount' => $this->votes()->count(),
            'votes_average' => $this->averageVotes()
        ];
    }
}

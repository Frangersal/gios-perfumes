<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['user_id', 'country', 'region', 'city', 'postal_code', 'address', 'type'];

    public function user() { return $this->belongsTo(User::class); }
}

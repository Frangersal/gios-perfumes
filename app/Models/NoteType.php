<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NoteType extends Model
{
    protected $fillable = ['name', 'slug'];

    public function productNotes() { return $this->hasMany(ProductNote::class); }
}

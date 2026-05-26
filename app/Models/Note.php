<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['name', 'slug', 'image'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_notes')
            ->withPivot(['note_type_id', 'position', 'intensity'])
            ->withTimestamps();
    }

    public function productNotes() { return $this->hasMany(ProductNote::class); }
}

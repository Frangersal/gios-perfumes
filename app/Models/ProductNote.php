<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductNote extends Model
{
    protected $fillable = [
        'product_id',
        'note_id',
        'note_type_id',
        'position',
        'intensity',
    ];

    public function product() { return $this->belongsTo(Product::class); }
    public function note() { return $this->belongsTo(Note::class); }
    public function noteType() { return $this->belongsTo(NoteType::class); }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['product_id', 'type', 'note'];

    public function product() { return $this->belongsTo(Product::class); }
}

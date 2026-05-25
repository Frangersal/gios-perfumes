<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryMovement extends Model
{
    protected $fillable = ['product_variant_id', 'type', 'quantity', 'description'];

    public function productVariant() { return $this->belongsTo(ProductVariant::class); }
}

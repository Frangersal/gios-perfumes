<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = ['product_id', 'volume', 'price', 'discount_price', 'cost', 'stock', 'min_stock'];

    public function product() { return $this->belongsTo(Product::class); }
    public function cartItems() { return $this->hasMany(CartItem::class); }
    public function orderItems() { return $this->hasMany(OrderItem::class); }
    public function inventoryMovements() { return $this->hasMany(InventoryMovement::class); }
}

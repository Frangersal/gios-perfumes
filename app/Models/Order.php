<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'status', 'subtotal', 'shipping', 'total', 'payment_method', 'tracking_number'];

    public function user() { return $this->belongsTo(User::class); }
    public function items() { return $this->hasMany(OrderItem::class); }
    public function coupons() { return $this->belongsToMany(Coupon::class, 'order_coupons'); }
}

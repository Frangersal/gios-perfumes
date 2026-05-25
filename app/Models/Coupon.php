<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = ['code', 'type', 'value', 'start_date', 'end_date', 'active'];

    public function orders() { return $this->belongsToMany(Order::class, 'order_coupons'); }
}

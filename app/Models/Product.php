<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'brand_id', 'category_id', 'name', 'slug', 'description', 
        'price', 'discount_price', 'cost', 'sku', 'gender', 
        'olfactory_family', 'concentration', 'year', 'country_of_origin', 
        'status', 'discount_percentage'
    ];

    public function brand() { return $this->belongsTo(Brand::class); }
    public function category() { return $this->belongsTo(Category::class); }
    public function variants() { return $this->hasMany(ProductVariant::class); }
    public function images() { return $this->hasMany(ProductImage::class); }
    public function tags() { return $this->belongsToMany(Tag::class, 'product_tags'); }
    public function notes() { return $this->hasMany(Note::class); }
    public function reviews() { return $this->hasMany(Review::class); }
    public function wishlistedBy() { return $this->belongsToMany(User::class, 'wishlists'); }
}

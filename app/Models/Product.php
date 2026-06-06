<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'brand_id', 'category_id', 'name', 'slug', 'description', 
        'price', 'discount_price', 'cost', 'sku', 'gender', 
        'olfactory_family', 'concentration', 'year', 'country_of_origin', 
        'status', 'discount_percentage',
        'video_url', 'meta_title', 'meta_description', 'meta_keywords'
    ];

    // Los IDs se generan con timestamp y pueden superar Number.MAX_SAFE_INTEGER (2^53-1).
    // Casteamos a string para que JSON los entregue como string y JS no pierda precisión.
    protected $casts = [
        'id' => 'string',
    ];

    public function brand() { return $this->belongsTo(Brand::class); }
    public function category() { return $this->belongsTo(Category::class); }
    public function variants() { return $this->hasMany(ProductVariant::class); }
    public function images() { return $this->hasMany(ProductImage::class); }
    public function tags() { return $this->belongsToMany(Tag::class, 'product_tags'); }
    public function notes()
    {
        return $this->belongsToMany(Note::class, 'product_notes')
            ->withPivot(['note_type_id', 'position', 'intensity'])
            ->withTimestamps();
    }
    public function productNotes() { return $this->hasMany(ProductNote::class); }
    public function reviews() { return $this->hasMany(Review::class); }
    public function wishlistedBy() { return $this->belongsToMany(User::class, 'wishlists'); }
}

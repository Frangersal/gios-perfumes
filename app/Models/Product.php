<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'brand_id', 'category_id', 'name', 'slug', 'description',
        'sku', 'gender',
        'olfactory_family', 'concentration', 'year', 'country_of_origin',
        'status',
        'video_url', 'meta_title', 'meta_description', 'meta_keywords'
    ];

    // Los IDs se generan con timestamp y pueden superar Number.MAX_SAFE_INTEGER (2^53-1).
    // Casteamos a string para que JSON los entregue como string y JS no pierda precisión.
    protected $casts = [
        'id' => 'string',
    ];

    // price y discount_price NO viven en products: se calculan tomando el mínimo de
    // las variantes (la presentación más barata = el "desde $X" del catálogo).
    // Para que estos accessors funcionen, el caller debe hacer ->with('variants').
    protected $appends = ['price', 'discount_price'];

    public function getPriceAttribute()
    {
        if (!$this->relationLoaded('variants')) {
            return null;
        }
        $min = $this->variants->min('price');
        return $min !== null ? (float) $min : null;
    }

    public function getDiscountPriceAttribute()
    {
        if (!$this->relationLoaded('variants')) {
            return null;
        }
        $min = $this->variants
            ->filter(fn ($v) => $v->discount_price !== null)
            ->min('discount_price');
        return $min !== null ? (float) $min : null;
    }

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

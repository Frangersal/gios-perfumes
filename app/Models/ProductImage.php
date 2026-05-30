<?php

namespace App\Models;

use App\Models\Concerns\GeneratesCreationBasedId;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use GeneratesCreationBasedId;

    public $incrementing = false;

    protected $keyType = 'int';

    protected $fillable = ['id', 'product_id', 'image', 'is_main', 'created_at', 'updated_at'];

    protected static function booted(): void
    {
        static::creating(function (self $productImage): void {
            if (empty($productImage->id)) {
                $productImage->id = self::generateCreationBasedId();
            }
        });
    }

    public function product() { return $this->belongsTo(Product::class); }
}

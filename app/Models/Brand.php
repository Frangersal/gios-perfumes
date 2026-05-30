<?php

namespace App\Models;

use App\Models\Concerns\GeneratesCreationBasedId;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use GeneratesCreationBasedId;

    public $incrementing = false;

    protected $keyType = 'int';

    protected $fillable = ['name', 'logo', 'description', 'banner', 'country_of_origin'];

    protected static function booted(): void
    {
        static::creating(function (self $brand): void {
            if (empty($brand->id)) {
                $brand->id = self::generateCreationBasedId();
            }
        });
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

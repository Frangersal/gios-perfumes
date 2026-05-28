<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $imageMapBySku = [
            'CH-212VB' => '212-vip-black.png',
            'DIOR-SE' => 'sauvage-elixir.png',
            'CHA-CM' => 'coco-mademoiselle.png',
            'VER-EF' => 'eros-flame.png',
            'PR-1ML' => '1-million-lucky.png',
            'LAT-KHA' => 'khamrah.png',
            'YSL-LI' => 'libre-intense.png',
            'JPG-LBLP' => 'le-beau-le-parfum.png',
            'GA-ADGP' => 'acqua-di-gio-profondo.png',
            'MA-PN' => 'porto-neroli.png',
        ];

        $reusableImages = array_values(array_unique(array_values($imageMapBySku)));

        $products = DB::table('products')
            ->orderBy('id')
            ->get(['id', 'sku']);

        foreach ($products as $index => $product) {
            $filename = $imageMapBySku[$product->sku] ?? ($reusableImages[$index % count($reusableImages)] ?? null);

            if (!$filename) {
                continue;
            }

            DB::table('product_images')->where('product_id', $product->id)->delete();

            ProductImage::create([
                'id' => ProductImage::generateCreationBasedId($now),
                'product_id' => $product->id,
                'image' => '/resources/img/products/' . $filename,
                'is_main' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}

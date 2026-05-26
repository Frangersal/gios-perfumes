<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $productId = DB::table('products')->insertGetId([
            'id' => 1,
            'brand_id' => 1,
            'category_id' => 5, // Amaderados
            'name' => '212 VIP Black',
            'slug' => Str::slug('212 VIP Black'),
            'description' => 'Un perfume explosivo de Carolina Herrera.',
            'price' => 120.00,
            'sku' => 'CH-212VB',
            'gender' => 'Hombre',
            'olfactory_family' => 'Fougère Amaderada',
            'concentration' => 'Eau de Parfum',
            'year' => 2017,
            'country_of_origin' => 'España',
            'status' => 'publicado',
            'video_url' => 'https://youtube.com/watch?v=demo',
            'meta_title' => '212 VIP Black Carolina Herrera | Gio\'s Perfumes',
            'meta_description' => 'Compra el perfume 212 VIP Black para Hombre. Descubre sus notas olfativas.',
            'meta_keywords' => '212 VIP Black, Carolina Herrera, Perfume Hombre',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('product_variants')->insert([
            ['product_id' => $productId, 'volume' => '50ml', 'price' => 90.00, 'stock' => 15, 'min_stock' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'volume' => '100ml', 'price' => 120.00, 'stock' => 20, 'min_stock' => 5, 'created_at' => now(), 'updated_at' => now()]
        ]);

        DB::table('notes')->insert([
            ['product_id' => $productId, 'type' => 'Nota Alta', 'note' => 'Absenta, Anís e Hinojo', 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'type' => 'Nota Media', 'note' => 'Lavanda', 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'type' => 'Nota de Base', 'note' => 'Almizcle, Vainilla negra', 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('product_tags')->insert([
            ['product_id' => $productId, 'tag_id' => 1, 'created_at' => now(), 'updated_at' => now()] // Novedad id: 1
        ]);
    }
}

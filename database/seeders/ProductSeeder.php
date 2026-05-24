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
            'nombre' => '212 VIP Black',
            'slug' => Str::slug('212 VIP Black'),
            'descripcion' => 'Un perfume explosivo de Carolina Herrera.',
            'precio' => 120.00,
            'sku' => 'CH-212VB',
            'genero' => 'Hombre',
            'familia_olfativa' => 'Fougère Amaderada',
            'concentracion' => 'Eau de Parfum',
            'anio' => 2017,
            'pais_origen' => 'España',
            'estado' => 'publicado',
            'video_url' => 'https://youtube.com/watch?v=demo',
            'meta_title' => '212 VIP Black Carolina Herrera | Gio\'s Perfumes',
            'meta_description' => 'Compra el perfume 212 VIP Black para Hombre. Descubre sus notas olfativas.',
            'meta_keywords' => '212 VIP Black, Carolina Herrera, Perfume Hombre',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('product_variants')->insert([
            ['product_id' => $productId, 'volumen' => '50ml', 'precio' => 90.00, 'stock' => 15, 'stock_minimo' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'volumen' => '100ml', 'precio' => 120.00, 'stock' => 20, 'stock_minimo' => 5, 'created_at' => now(), 'updated_at' => now()]
        ]);

        DB::table('notes')->insert([
            ['product_id' => $productId, 'tipo' => 'Nota Alta', 'nota' => 'Absenta, Anís e Hinojo', 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'tipo' => 'Nota Media', 'nota' => 'Lavanda', 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'tipo' => 'Nota de Base', 'nota' => 'Almizcle, Vainilla negra', 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('product_tags')->insert([
            ['product_id' => $productId, 'tag_id' => 1, 'created_at' => now(), 'updated_at' => now()] // Novedad id: 1
        ]);
    }
}

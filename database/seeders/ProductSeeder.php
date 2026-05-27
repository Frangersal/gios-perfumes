<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $noteTypeSalidaId = DB::table('note_types')->insertGetId([
            'name' => 'Salida',
            'slug' => 'salida',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $noteTypeCorazonId = DB::table('note_types')->insertGetId([
            'name' => 'Corazon',
            'slug' => 'corazon',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $noteTypeFondoId = DB::table('note_types')->insertGetId([
            'name' => 'Fondo',
            'slug' => 'fondo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

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

        $absentaId = DB::table('notes')->insertGetId([
            'name' => 'Absenta',
            'slug' => 'absenta',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $anisId = DB::table('notes')->insertGetId([
            'name' => 'Anis',
            'slug' => 'anis',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $hinojoId = DB::table('notes')->insertGetId([
            'name' => 'Hinojo',
            'slug' => 'hinojo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $lavandaId = DB::table('notes')->insertGetId([
            'name' => 'Lavanda',
            'slug' => 'lavanda',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $almizcleId = DB::table('notes')->insertGetId([
            'name' => 'Almizcle',
            'slug' => 'almizcle',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $vainillaNegraId = DB::table('notes')->insertGetId([
            'name' => 'Vainilla negra',
            'slug' => 'vainilla-negra',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('product_notes')->insert([
            ['product_id' => $productId, 'note_id' => $absentaId, 'note_type_id' => $noteTypeSalidaId, 'position' => 1, 'intensity' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'note_id' => $anisId, 'note_type_id' => $noteTypeSalidaId, 'position' => 2, 'intensity' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'note_id' => $hinojoId, 'note_type_id' => $noteTypeSalidaId, 'position' => 3, 'intensity' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'note_id' => $lavandaId, 'note_type_id' => $noteTypeCorazonId, 'position' => 1, 'intensity' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'note_id' => $almizcleId, 'note_type_id' => $noteTypeFondoId, 'position' => 1, 'intensity' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['product_id' => $productId, 'note_id' => $vainillaNegraId, 'note_type_id' => $noteTypeFondoId, 'position' => 2, 'intensity' => 8, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('product_tags')->insert([
            ['product_id' => $productId, 'tag_id' => 1, 'created_at' => now(), 'updated_at' => now()] // Novedad id: 1
        ]);
    }
}

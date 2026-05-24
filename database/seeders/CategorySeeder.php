<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $catHombreId = DB::table('categories')->insertGetId([
            'id' => 1,
            'nombre' => 'Hombre',
            'descripcion' => 'Perfumes para caballero',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catMujerId = DB::table('categories')->insertGetId([
            'id' => 2,
            'nombre' => 'Mujer',
            'descripcion' => 'Perfumes para dama',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catUnisexId = DB::table('categories')->insertGetId([
            'id' => 3,
            'nombre' => 'Unisex',
            'descripcion' => 'Perfumes para todos',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catArabesId = DB::table('categories')->insertGetId([
            'id' => 4,
            'nombre' => 'Árabes',
            'descripcion' => 'Fragancias orientales exclusivas',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('categories')->insert([
            'id' => 5,
            'nombre' => 'Amaderados',
            'parent_id' => $catHombreId,
            'descripcion' => 'Fragancias con notas de madera',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

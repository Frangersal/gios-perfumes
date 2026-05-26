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
            'name' => 'Hombre',
            'description' => 'Perfumes para caballero',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catMujerId = DB::table('categories')->insertGetId([
            'id' => 2,
            'name' => 'Mujer',
            'description' => 'Perfumes para dama',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catUnisexId = DB::table('categories')->insertGetId([
            'id' => 3,
            'name' => 'Unisex',
            'description' => 'Perfumes para todos',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $catArabesId = DB::table('categories')->insertGetId([
            'id' => 4,
            'name' => 'Árabes',
            'description' => 'Fragancias orientales exclusivas',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('categories')->insert([
            'id' => 5,
            'name' => 'Amaderados',
            'parent_id' => $catHombreId,
            'description' => 'Fragancias con notas de madera',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

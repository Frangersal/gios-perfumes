<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $catHombre = Category::updateOrCreate(
            ['id' => 1],
            ['name' => 'Hombre', 'description' => 'Perfumes para caballero']
        );

        $catMujer = Category::updateOrCreate(
            ['id' => 2],
            ['name' => 'Mujer', 'description' => 'Perfumes para dama']
        );

        $catUnisex = Category::updateOrCreate(
            ['id' => 3],
            ['name' => 'Unisex', 'description' => 'Perfumes para todos']
        );

        $catArabes = Category::updateOrCreate(
            ['id' => 4],
            ['name' => 'Árabes', 'description' => 'Fragancias orientales exclusivas']
        );

        Category::updateOrCreate(
            ['id' => 5],
            [
                'name' => 'Amaderados',
                'parent_id' => $catHombre->id,
                'description' => 'Fragancias con notas de madera'
            ]
        );
    }
}

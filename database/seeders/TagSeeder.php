<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tags')->insert([
            ['id' => 1, 'nombre' => 'Novedad', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'nombre' => 'Descontinuados', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

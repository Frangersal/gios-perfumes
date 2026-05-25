<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tags')->insert([
            ['id' => 1, 'name' => 'Novedad', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Descontinuados', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

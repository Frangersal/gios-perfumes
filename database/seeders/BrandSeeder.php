<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('brands')->insert([
            'id' => 1,
            'name' => 'Carolina Herrera',
            'logo' => 'carolina_herrera_logo.png',
            'description' => 'Marca de lujo reconocida mundialmente.',
            'country_of_origin' => 'Estados Unidos',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

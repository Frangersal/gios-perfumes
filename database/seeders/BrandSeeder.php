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
            'nombre' => 'Carolina Herrera',
            'logo' => 'carolina_herrera_logo.png',
            'descripcion' => 'Marca de lujo reconocida mundialmente.',
            'pais_origen' => 'Estados Unidos',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

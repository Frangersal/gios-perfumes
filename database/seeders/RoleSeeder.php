<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'Super admin', 'description' => 'Control total del sistema', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Vendedor', 'description' => 'Gestión de productos y ventas', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Almacenista', 'description' => 'Control de inventario de las variantes', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Soporte', 'description' => 'Moderación de reseñas y atención al cliente', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Cliente', 'description' => 'Cliente comprador de la tienda', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

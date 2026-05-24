<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            ['id' => 1, 'nombre' => 'Super admin', 'descripcion' => 'Control total del sistema', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'nombre' => 'Vendedor', 'descripcion' => 'Gestión de productos y ventas', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'nombre' => 'Almacenista', 'descripcion' => 'Control de inventario de las variantes', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'nombre' => 'Soporte', 'descripcion' => 'Moderación de reseñas y atención al cliente', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'nombre' => 'Cliente', 'descripcion' => 'Cliente comprador de la tienda', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

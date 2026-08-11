<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['id' => 1, 'name' => 'Super admin', 'description' => 'Control total del sistema'],
            ['id' => 2, 'name' => 'Vendedor', 'description' => 'Gestión de productos y ventas'],
            ['id' => 3, 'name' => 'Almacenista', 'description' => 'Control de inventario de las variantes'],
            ['id' => 4, 'name' => 'Soporte', 'description' => 'Moderación de reseñas y atención al cliente'],
            ['id' => 5, 'name' => 'Cliente', 'description' => 'Cliente comprador de la tienda'],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['id' => $role['id']],
                [
                    'name' => $role['name'], 
                    'description' => $role['description']
                ]
            );
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = DB::table('users')->insertGetId([
            'name' => 'Admin Gios',
            'email' => 'admin@giosperfumes.com',
            'password' => Hash::make('password'),
            'telefono' => '+1234567890',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $clienteId = DB::table('users')->insertGetId([
            'name' => 'Cliente Demo',
            'email' => 'cliente@demo.com',
            'password' => Hash::make('password'),
            'telefono' => '+0987654321',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('user_roles')->insert([
            ['user_id' => $adminId, 'role_id' => 1, 'created_at' => now(), 'updated_at' => now()], // Super admin (id 1)
            ['user_id' => $clienteId, 'role_id' => 5, 'created_at' => now(), 'updated_at' => now()], // Cliente (id 5)
        ]);
    }
}

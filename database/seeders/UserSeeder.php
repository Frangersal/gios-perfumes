<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $password = Hash::make('password');

        $users = [
            ['name' => 'Admin Gios', 'email' => 'admin@giosperfumes.com', 'phone' => '+1234567890', 'role_id' => 1],
            ['name' => 'Vendedor Demo', 'email' => 'vendedor@demo.com', 'phone' => '+1234567891', 'role_id' => 2],
            ['name' => 'Almacenista Demo', 'email' => 'almacen@demo.com', 'phone' => '+1234567892', 'role_id' => 3],
            ['name' => 'Soporte Demo', 'email' => 'soporte@demo.com', 'phone' => '+1234567893', 'role_id' => 4],
            ['name' => 'Cliente Demo', 'email' => 'cliente@demo.com', 'phone' => '+1234567894', 'role_id' => 5],
            ['name' => 'Laura Martinez', 'email' => 'laura.martinez@demo.com', 'phone' => '+1234567895', 'role_id' => 5],
            ['name' => 'Carlos Rivera', 'email' => 'carlos.rivera@demo.com', 'phone' => '+1234567896', 'role_id' => 5],
            ['name' => 'Ana Gomez', 'email' => 'ana.gomez@demo.com', 'phone' => '+1234567897', 'role_id' => 5],
            ['name' => 'Miguel Torres', 'email' => 'miguel.torres@demo.com', 'phone' => '+1234567898', 'role_id' => 5],
            ['name' => 'Sofia Herrera', 'email' => 'sofia.herrera@demo.com', 'phone' => '+1234567899', 'role_id' => 5],
        ];

        foreach ($users as $user) {
            $existingUserId = DB::table('users')->where('email', $user['email'])->value('id');

            $payload = [
                'name' => $user['name'],
                'phone' => $user['phone'],
                'password' => $password,
                'email_verified_at' => $now,
                'remember_token' => Str::random(10),
                'updated_at' => $now,
            ];

            if ($existingUserId) {
                DB::table('users')->where('id', $existingUserId)->update($payload);
                continue;
            }

            DB::table('users')->insert($payload + [
                'id' => User::generateCreationBasedId($now),
                'email' => $user['email'],
                'created_at' => $now,
            ]);
        }

        $userIds = DB::table('users')
            ->whereIn('email', array_column($users, 'email'))
            ->pluck('id', 'email');

        DB::table('user_roles')->whereIn('user_id', $userIds->values())->delete();

        $roles = [];
        foreach ($users as $user) {
            $roles[] = [
                'user_id' => $userIds[$user['email']],
                'role_id' => $user['role_id'],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('user_roles')->insert($roles);
    }
}

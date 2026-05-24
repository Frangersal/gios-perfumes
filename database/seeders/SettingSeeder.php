<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('settings')->insert([
            ['clave' => 'store_logo', 'valor' => 'logo_principal.png', 'grupo' => 'general', 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'store_currency', 'valor' => 'MXN', 'grupo' => 'general', 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'store_tax', 'valor' => '16', 'grupo' => 'impuestos', 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'facebook_url', 'valor' => 'https://facebook.com/giosperfumes', 'grupo' => 'redes_sociales', 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'instagram_url', 'valor' => 'https://instagram.com/giosperfumes', 'grupo' => 'redes_sociales', 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'payment_stripe_active', 'valor' => 'true', 'grupo' => 'pagos', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

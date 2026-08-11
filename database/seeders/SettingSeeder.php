<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['clave' => 'store_logo', 'valor' => 'logo_principal.png', 'grupo' => 'general'],
            ['clave' => 'store_currency', 'valor' => 'MXN', 'grupo' => 'general'],
            ['clave' => 'store_tax', 'valor' => '16', 'grupo' => 'impuestos'],
            ['clave' => 'facebook_url', 'valor' => 'https://facebook.com/giosperfumes', 'grupo' => 'redes_sociales'],
            ['clave' => 'instagram_url', 'valor' => 'https://instagram.com/giosperfumes', 'grupo' => 'redes_sociales'],
            ['clave' => 'payment_stripe_active', 'valor' => 'true', 'grupo' => 'pagos'],
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->updateOrInsert(
                ['clave' => $setting['clave']],
                [
                    'valor' => $setting['valor'],
                    'grupo' => $setting['grupo'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'Carolina Herrera', 'logo' => '/resources/img/brands/carolina_herrera_logo.png', 'description' => 'Marca de lujo reconocida mundialmente por sus fragancias elegantes.', 'country_of_origin' => 'Estados Unidos'],
            ['name' => 'Dior', 'logo' => '/resources/img/brands/dior_logo.png', 'description' => 'Casa francesa con perfumes intensos y sofisticados.', 'country_of_origin' => 'Francia'],
            ['name' => 'Chanel', 'logo' => '/resources/img/brands/chanel_logo.png', 'description' => 'Firma icónica con fragancias clásicas y contemporáneas.', 'country_of_origin' => 'Francia'],
            ['name' => 'Versace', 'logo' => '/resources/img/brands/versace_logo.png', 'description' => 'Perfumes vibrantes con identidad mediterránea.', 'country_of_origin' => 'Italia'],
            ['name' => 'Paco Rabanne', 'logo' => '/resources/img/brands/paco_rabanne_logo.png', 'description' => 'Fragancias modernas con perfil audaz y comercial.', 'country_of_origin' => 'España'],
            ['name' => 'Lattafa', 'logo' => '/resources/img/brands/lattafa_logo.png', 'description' => 'Marca árabe popular por sus perfumes intensos y dulces.', 'country_of_origin' => 'Emiratos Árabes Unidos'],
            ['name' => 'Yves Saint Laurent', 'logo' => '/resources/img/brands/ysl_logo.png', 'description' => 'Fragancias refinadas con un enfoque moderno y elegante.', 'country_of_origin' => 'Francia'],
            ['name' => 'Jean Paul Gaultier', 'logo' => '/resources/img/brands/jpg_logo.png', 'description' => 'Perfumes con mucha personalidad y gran presencia.', 'country_of_origin' => 'Francia'],
            ['name' => 'Giorgio Armani', 'logo' => '/resources/img/brands/armani_logo.png', 'description' => 'Fragancias limpias, premium y versátiles.', 'country_of_origin' => 'Italia'],
            ['name' => 'Maison Alhambra', 'logo' => '/resources/img/brands/maison_alhambra_logo.png', 'description' => 'Marca reconocida por interpretaciones modernas y accesibles.', 'country_of_origin' => 'Emiratos Árabes Unidos'],
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(
                ['name' => $brand['name']],
                [
                    'logo' => $brand['logo'],
                    'description' => $brand['description'],
                    'country_of_origin' => $brand['country_of_origin'],
                ]
            );
        }
    }
}

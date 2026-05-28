<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $noteTypes = [
            ['name' => 'Salida', 'slug' => 'salida'],
            ['name' => 'Corazon', 'slug' => 'corazon'],
            ['name' => 'Fondo', 'slug' => 'fondo'],
        ];

        foreach ($noteTypes as $noteType) {
            DB::table('note_types')->updateOrInsert(
                ['slug' => $noteType['slug']],
                [
                    'name' => $noteType['name'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }

        $notes = [
            ['name' => 'Bergamota', 'slug' => 'bergamota'],
            ['name' => 'Pimienta negra', 'slug' => 'pimienta-negra'],
            ['name' => 'Lavanda', 'slug' => 'lavanda'],
            ['name' => 'Ambroxan', 'slug' => 'ambroxan'],
            ['name' => 'Vainilla negra', 'slug' => 'vainilla-negra'],
            ['name' => 'Jazmin', 'slug' => 'jazmin'],
            ['name' => 'Rosa', 'slug' => 'rosa'],
            ['name' => 'Almizcle', 'slug' => 'almizcle'],
            ['name' => 'Oud', 'slug' => 'oud'],
            ['name' => 'Ambar', 'slug' => 'ambar'],
            ['name' => 'Haba tonka', 'slug' => 'haba-tonka'],
            ['name' => 'Limon', 'slug' => 'limon'],
            ['name' => 'Incienso', 'slug' => 'incienso'],
            ['name' => 'Vetiver', 'slug' => 'vetiver'],
            ['name' => 'Pera', 'slug' => 'pera'],
        ];

        foreach ($notes as $note) {
            DB::table('notes')->updateOrInsert(
                ['slug' => $note['slug']],
                [
                    'name' => $note['name'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }

        $brandIds = DB::table('brands')->pluck('id', 'name');

        $products = [
            [
                'id' => 1001,
                'name' => '212 VIP Black',
                'brand_name' => 'Carolina Herrera',
                'category_id' => 5,
                'price' => 120.00,
                'discount_price' => 108.00,
                'cost' => 72.00,
                'sku' => 'CH-212VB',
                'gender' => 'Hombre',
                'olfactory_family' => 'Fougere Amaderada',
                'concentration' => 'Eau de Parfum',
                'year' => 2017,
                'country_of_origin' => 'Estados Unidos',
                'discount_percentage' => 10,
            ],
            [
                'id' => 1002,
                'name' => 'Sauvage Elixir',
                'brand_name' => 'Dior',
                'category_id' => 1,
                'price' => 165.00,
                'discount_price' => null,
                'cost' => 99.00,
                'sku' => 'DIOR-SE',
                'gender' => 'Hombre',
                'olfactory_family' => 'Aromatica',
                'concentration' => 'Parfum',
                'year' => 2021,
                'country_of_origin' => 'Francia',
                'discount_percentage' => null,
            ],
            [
                'id' => 1003,
                'name' => 'Coco Mademoiselle',
                'brand_name' => 'Chanel',
                'category_id' => 2,
                'price' => 155.00,
                'discount_price' => 145.00,
                'cost' => 93.00,
                'sku' => 'CHA-CM',
                'gender' => 'Mujer',
                'olfactory_family' => 'Ambar Floral',
                'concentration' => 'Eau de Parfum',
                'year' => 2001,
                'country_of_origin' => 'Francia',
                'discount_percentage' => 6,
            ],
            [
                'id' => 1004,
                'name' => 'Eros Flame',
                'brand_name' => 'Versace',
                'category_id' => 1,
                'price' => 110.00,
                'discount_price' => null,
                'cost' => 66.00,
                'sku' => 'VER-EF',
                'gender' => 'Hombre',
                'olfactory_family' => 'Amaderada Especiada',
                'concentration' => 'Eau de Parfum',
                'year' => 2018,
                'country_of_origin' => 'Italia',
                'discount_percentage' => null,
            ],
            [
                'id' => 1005,
                'name' => '1 Million Lucky',
                'brand_name' => 'Paco Rabanne',
                'category_id' => 1,
                'price' => 118.00,
                'discount_price' => 99.00,
                'cost' => 70.80,
                'sku' => 'PR-1ML',
                'gender' => 'Hombre',
                'olfactory_family' => 'Amaderada Dulce',
                'concentration' => 'Eau de Toilette',
                'year' => 2018,
                'country_of_origin' => 'España',
                'discount_percentage' => 16,
            ],
            [
                'id' => 1006,
                'name' => 'Khamrah',
                'brand_name' => 'Lattafa',
                'category_id' => 4,
                'price' => 78.00,
                'discount_price' => null,
                'cost' => 46.80,
                'sku' => 'LAT-KHA',
                'gender' => 'Unisex',
                'olfactory_family' => 'Ambar Especiada',
                'concentration' => 'Eau de Parfum',
                'year' => 2022,
                'country_of_origin' => 'Emiratos Árabes Unidos',
                'discount_percentage' => null,
            ],
            [
                'id' => 1007,
                'name' => 'Libre Intense',
                'brand_name' => 'Yves Saint Laurent',
                'category_id' => 2,
                'price' => 142.00,
                'discount_price' => 128.00,
                'cost' => 85.20,
                'sku' => 'YSL-LI',
                'gender' => 'Mujer',
                'olfactory_family' => 'Ambar Floral',
                'concentration' => 'Eau de Parfum Intense',
                'year' => 2020,
                'country_of_origin' => 'Francia',
                'discount_percentage' => 10,
            ],
            [
                'id' => 1008,
                'name' => 'Le Beau Le Parfum',
                'brand_name' => 'Jean Paul Gaultier',
                'category_id' => 1,
                'price' => 135.00,
                'discount_price' => null,
                'cost' => 81.00,
                'sku' => 'JPG-LBLP',
                'gender' => 'Hombre',
                'olfactory_family' => 'Ambar Amaderada',
                'concentration' => 'Parfum',
                'year' => 2022,
                'country_of_origin' => 'Francia',
                'discount_percentage' => null,
            ],
            [
                'id' => 1009,
                'name' => 'Acqua di Gio Profondo',
                'brand_name' => 'Giorgio Armani',
                'category_id' => 1,
                'price' => 130.00,
                'discount_price' => 117.00,
                'cost' => 78.00,
                'sku' => 'GA-ADGP',
                'gender' => 'Hombre',
                'olfactory_family' => 'Aromatica Acuatica',
                'concentration' => 'Eau de Parfum',
                'year' => 2020,
                'country_of_origin' => 'Italia',
                'discount_percentage' => 10,
            ],
            [
                'id' => 1010,
                'name' => 'Porto Neroli',
                'brand_name' => 'Maison Alhambra',
                'category_id' => 3,
                'price' => 62.00,
                'discount_price' => null,
                'cost' => 37.20,
                'sku' => 'MA-PN',
                'gender' => 'Unisex',
                'olfactory_family' => 'Citrica Floral',
                'concentration' => 'Eau de Parfum',
                'year' => 2023,
                'country_of_origin' => 'Emiratos Árabes Unidos',
                'discount_percentage' => null,
            ],
        ];

        foreach ($products as $product) {
            $brandId = $brandIds[$product['brand_name']] ?? null;

            if (!$brandId) {
                continue;
            }

            $payload = [
                'brand_id' => $brandId,
                'category_id' => $product['category_id'],
                'name' => $product['name'],
                'slug' => Str::slug($product['name'] . ' ' . $product['brand_name']),
                'description' => 'Fragancia de prueba para catalogo: ' . $product['name'] . '.',
                'price' => $product['price'],
                'discount_price' => $product['discount_price'],
                'cost' => $product['cost'],
                'sku' => $product['sku'],
                'gender' => $product['gender'],
                'olfactory_family' => $product['olfactory_family'],
                'concentration' => $product['concentration'],
                'year' => $product['year'],
                'country_of_origin' => $product['country_of_origin'],
                'status' => 'publicado',
                'discount_percentage' => $product['discount_percentage'],
                'video_url' => 'https://www.youtube.com/watch?v=demo',
                'meta_title' => $product['name'] . ' | Gio\'s Perfumes',
                'meta_description' => 'Compra ' . $product['name'] . ' en Gio\'s Perfumes.',
                'meta_keywords' => implode(', ', [$product['name'], $product['brand_name'], $product['gender'], 'perfume']),
            ];

            $existingId = DB::table('products')->where('sku', $product['sku'])->value('id');

            if ($existingId) {
                DB::table('products')->where('id', $existingId)->update([
                    ...$payload,
                    'updated_at' => $now,
                ]);
                continue;
            }

            DB::table('products')->insert([
                'id' => $product['id'],
                ...$payload,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $productIds = DB::table('products')
            ->whereIn('sku', array_column($products, 'sku'))
            ->pluck('id', 'sku');

        DB::table('product_variants')->whereIn('product_id', $productIds->values())->delete();
        DB::table('product_notes')->whereIn('product_id', $productIds->values())->delete();
        DB::table('product_tags')->whereIn('product_id', $productIds->values())->delete();

        $variants = [];
        foreach ($products as $index => $product) {
            $productId = $productIds[$product['sku']] ?? null;

            if (!$productId) {
                continue;
            }

            $variants[] = [
                'product_id' => $productId,
                'volume' => '50ml',
                'price' => round($product['price'] * 0.78, 2),
                'stock' => 12 + $index,
                'min_stock' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ];
            $variants[] = [
                'product_id' => $productId,
                'volume' => '100ml',
                'price' => $product['price'],
                'stock' => 18 + $index,
                'min_stock' => 5,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('product_variants')->insert($variants);

        $tagAssignments = [];
        foreach ($products as $index => $product) {
            $productId = $productIds[$product['sku']] ?? null;

            if (!$productId) {
                continue;
            }

            $tagAssignments[] = [
                'product_id' => $productId,
                'tag_id' => $index < 5 ? 1 : 2,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('product_tags')->insert($tagAssignments);

        $noteTypeIds = DB::table('note_types')->pluck('id', 'slug');
        $noteIds = DB::table('notes')->pluck('id', 'slug');

        $noteProfiles = [
            ['salida' => ['bergamota'], 'corazon' => ['lavanda'], 'fondo' => ['vainilla-negra']],
            ['salida' => ['pimienta-negra'], 'corazon' => ['ambroxan'], 'fondo' => ['vetiver']],
            ['salida' => ['bergamota'], 'corazon' => ['jazmin'], 'fondo' => ['almizcle']],
            ['salida' => ['limon'], 'corazon' => ['rosa'], 'fondo' => ['ambar']],
            ['salida' => ['bergamota'], 'corazon' => ['haba-tonka'], 'fondo' => ['vetiver']],
            ['salida' => ['canela'], 'corazon' => ['oud'], 'fondo' => ['ambar']],
            ['salida' => ['pera'], 'corazon' => ['jazmin'], 'fondo' => ['vainilla-negra']],
            ['salida' => ['bergamota'], 'corazon' => ['coco'], 'fondo' => ['haba-tonka']],
            ['salida' => ['bergamota'], 'corazon' => ['incienso'], 'fondo' => ['almizcle']],
            ['salida' => ['limon'], 'corazon' => ['jazmin'], 'fondo' => ['ambar']],
        ];

        $extraNotes = [
            ['name' => 'Canela', 'slug' => 'canela'],
            ['name' => 'Coco', 'slug' => 'coco'],
        ];

        foreach ($extraNotes as $note) {
            DB::table('notes')->updateOrInsert(
                ['slug' => $note['slug']],
                [
                    'name' => $note['name'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }

        $noteIds = DB::table('notes')->pluck('id', 'slug');

        $productNotes = [];
        foreach ($products as $index => $product) {
            $productId = $productIds[$product['sku']] ?? null;

            if (!$productId) {
                continue;
            }

            foreach (['salida', 'corazon', 'fondo'] as $typeSlug) {
                foreach ($noteProfiles[$index][$typeSlug] as $position => $noteSlug) {
                    $productNotes[] = [
                        'product_id' => $productId,
                        'note_id' => $noteIds[$noteSlug],
                        'note_type_id' => $noteTypeIds[$typeSlug],
                        'position' => $position + 1,
                        'intensity' => 6 + $position,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
            }
        }

        DB::table('product_notes')->insert($productNotes);
    }
}

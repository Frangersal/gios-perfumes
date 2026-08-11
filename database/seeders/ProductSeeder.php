<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $brands = Brand::pluck('id', 'name');

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

        $namePrefixes = ['Noir', 'Amber', 'Velvet', 'Royal', 'Urban', 'Mystic', 'Oud', 'Silver', 'Golden', 'Night'];
        $nameCore = ['Essence', 'Elixir', 'Rush', 'Aura', 'Bloom', 'Code', 'Spirit', 'Flame', 'Touch', 'Pulse'];
        $nameSuffixes = ['Intense', 'Absolu', 'Signature', 'Edition', 'Reserve', 'Prime', 'Classic', 'Nuit'];
        $genders = ['Hombre', 'Mujer', 'Unisex', 'Arabe'];
        $families = ['Amaderada', 'Ambar Especiada', 'Citrica', 'Floral', 'Aromatica', 'Oriental'];
        $concentrations = ['Eau de Toilette', 'Eau de Parfum', 'Parfum', 'Extrait de Parfum'];

        $availableCategoryIds = \Illuminate\Support\Facades\DB::table('categories')->pluck('id')->values()->all();
        $availableBrands = \Illuminate\Support\Facades\DB::table('brands')->select(['name', 'country_of_origin'])->get()->keyBy('name');

        $extraProducts = [];
        for ($i = 1; $i <= 24; $i++) {
            if ($availableBrands->isEmpty() || empty($availableCategoryIds)) {
                break;
            }

            $brandName = $availableBrands->keys()->random();
            $brandData = $availableBrands->get($brandName);
            $price = random_int(58, 220);
            $hasDiscount = random_int(0, 100) <= 55;
            $discountPercentage = $hasDiscount ? random_int(5, 25) : null;
            $discountPrice = $hasDiscount ? round($price * (1 - ($discountPercentage / 100)), 2) : null;

            $generatedName = sprintf(
                '%s %s %s %02d',
                $namePrefixes[array_rand($namePrefixes)],
                $nameCore[array_rand($nameCore)],
                $nameSuffixes[array_rand($nameSuffixes)],
                $i
            );

            $extraProducts[] = [
                'name' => $generatedName,
                'brand_name' => $brandName,
                'category_id' => $availableCategoryIds[array_rand($availableCategoryIds)],
                'price' => $price,
                'discount_price' => $discountPrice,
                'cost' => round($price * random_int(50, 75) / 100, 2),
                'sku' => sprintf('AUTO-RND-%03d', $i),
                'gender' => $genders[array_rand($genders)],
                'olfactory_family' => $families[array_rand($families)],
                'concentration' => $concentrations[array_rand($concentrations)],
                'year' => random_int(2008, 2026),
                'country_of_origin' => $brandData->country_of_origin ?? 'Francia',
                'discount_percentage' => $discountPercentage,
            ];
        }

        $products = array_merge($products, $extraProducts);

        foreach ($products as $product) {
            $brandId = $brands[$product['brand_name']] ?? null;

            if (!$brandId) {
                continue;
            }

            $payload = [
                'brand_id' => $brandId,
                'category_id' => $product['category_id'],
                'name' => $product['name'],
                'slug' => Str::slug($product['name'] . ' ' . $product['brand_name'] . ' ' . $product['sku']),
                'description' => 'Fragancia de prueba para catalogo: ' . $product['name'] . '.',
                'sku' => $product['sku'],
                'gender' => $product['gender'],
                'olfactory_family' => $product['olfactory_family'],
                'concentration' => $product['concentration'],
                'year' => $product['year'],
                'country_of_origin' => $product['country_of_origin'],
                'status' => 'publicado',
                'video_url' => 'https://www.youtube.com/watch?v=demo',
                'meta_title' => $product['name'] . ' | Gio\'s Perfumes',
                'meta_description' => 'Compra ' . $product['name'] . ' en Gio\'s Perfumes.',
                'meta_keywords' => implode(', ', [$product['name'], $product['brand_name'], $product['gender'], 'perfume']),
            ];

            if (isset($product['id'])) {
                $payload['id'] = $product['id'];
            }

            $existingProduct = Product::whereRaw("sku = ?", [$product['sku']])->first();

            if ($existingProduct) {
                $existingProduct->update($payload);
            } else {
                Product::create($payload);
            }
        }

        $productIds = Product::whereIn('sku', array_column($products, 'sku'))
            ->pluck('id', 'sku');

        \Illuminate\Support\Facades\DB::table('product_variants')->whereIn('product_id', $productIds->values())->delete();
        \Illuminate\Support\Facades\DB::table('product_notes')->whereIn('product_id', $productIds->values())->delete();
        \Illuminate\Support\Facades\DB::table('product_tags')->whereIn('product_id', $productIds->values())->delete();

        $variants = [];
        foreach ($products as $index => $product) {
            $productId = $productIds[$product['sku']] ?? null;

            if (!$productId) {
                continue;
            }

            // Precio 50ml = 78% del 100ml; descuento y costo se replican en proporción.
            $price50 = round($product['price'] * 0.78, 2);
            $price100 = $product['price'];
            $discount50 = $product['discount_price'] !== null ? round($product['discount_price'] * 0.78, 2) : null;
            $discount100 = $product['discount_price'];
            $cost50 = round($product['cost'] * 0.78, 2);
            $cost100 = $product['cost'];

            $variants[] = [
                'product_id' => $productId,
                'volume' => '50ml',
                'price' => $price50,
                'discount_price' => $discount50,
                'cost' => $cost50,
                'stock' => 12 + $index,
                'min_stock' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ];
            $variants[] = [
                'product_id' => $productId,
                'volume' => '100ml',
                'price' => $price100,
                'discount_price' => $discount100,
                'cost' => $cost100,
                'stock' => 18 + $index,
                'min_stock' => 5,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        if (!empty($variants)) {
            DB::table('product_variants')->insert($variants);
        }

        $tagIds = DB::table('tags')->pluck('id')->values()->all();
        $tagAssignments = [];
        foreach ($products as $product) {
            $productId = $productIds[$product['sku']] ?? null;

            if (!$productId) {
                continue;
            }

            if (empty($tagIds)) {
                continue;
            }

            $maxTags = min(3, count($tagIds));
            $tagsForProduct = collect($tagIds)
                ->shuffle()
                ->take(random_int(1, $maxTags))
                ->values()
                ->all();

            foreach ($tagsForProduct as $tagId) {
                $tagAssignments[] = [
                    'product_id' => $productId,
                    'tag_id' => $tagId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }

        if (!empty($tagAssignments)) {
            DB::table('product_tags')->insert($tagAssignments);
        }

        $noteTypeIds = DB::table('note_types')->pluck('id', 'slug');
        $noteIds = DB::table('notes')->pluck('id', 'slug');
        $noteSlugs = $noteIds->keys()->values()->all();

        $productNotes = [];
        foreach ($products as $product) {
            $productId = $productIds[$product['sku']] ?? null;

            if (!$productId) {
                continue;
            }

            foreach (['salida', 'corazon', 'fondo'] as $typeSlug) {
                $notesPerType = collect($noteSlugs)
                    ->shuffle()
                    ->take(random_int(1, 2))
                    ->values()
                    ->all();

                foreach ($notesPerType as $position => $noteSlug) {
                    $productNotes[] = [
                        'product_id' => $productId,
                        'note_id' => $noteIds[$noteSlug],
                        'note_type_id' => $noteTypeIds[$typeSlug],
                        'position' => $position + 1,
                        'intensity' => random_int(5, 9),
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
            }
        }

        if (!empty($productNotes)) {
            DB::table('product_notes')->insert($productNotes);
        }
    }
}

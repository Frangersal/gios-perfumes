<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\NoteType;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    public function run(): void
    {
        $noteTypes = [
            ['name' => 'Salida', 'slug' => 'salida'],
            ['name' => 'Corazon', 'slug' => 'corazon'],
            ['name' => 'Fondo', 'slug' => 'fondo'],
        ];

        foreach ($noteTypes as $noteType) {
            NoteType::updateOrCreate(
                ['slug' => $noteType['slug']],
                ['name' => $noteType['name']]
            );
        }

        $notes = [
            [
                'name' => 'Bergamota',
                'slug' => 'bergamota',
                'description' => 'Citrico italiano luminoso y refrescante. Aporta un inicio limpio, ligeramente amargo y elegante, muy usado en notas de salida masculinas y unisex.',
            ],
            // ... (I'll keep the rest of the array exactly as is, I just want to replace the top part and imports)
            [
                'name' => 'Pimienta negra',
                'slug' => 'pimienta-negra',
                'description' => 'Especia picante y seca que aporta energia y caracter al inicio del perfume. Combina muy bien con maderas y citricos.',
            ],
            [
                'name' => 'Lavanda',
                'slug' => 'lavanda',
                'description' => 'Nota herbal-aromatica clasica de la perfumeria masculina. Limpia, fresca y ligeramente dulce, base de las familias fougere.',
            ],
            [
                'name' => 'Ambroxan',
                'slug' => 'ambroxan',
                'description' => 'Molecula sintetica que evoca el ambar gris: calida, mineral y con efecto piel. Aporta estela moderna y sensual.',
            ],
            [
                'name' => 'Vainilla negra',
                'slug' => 'vainilla-negra',
                'description' => 'Version intensa y resinosa de la vainilla. Dulce, ahumada y golosa, perfecta para fondos orientales gourmand.',
            ],
            [
                'name' => 'Jazmin',
                'slug' => 'jazmin',
                'description' => 'Flor blanca rica, opulenta y ligeramente animal. Pilar de los perfumes florales femeninos sofisticados.',
            ],
            [
                'name' => 'Rosa',
                'slug' => 'rosa',
                'description' => 'Flor reina de la perfumeria. Va de lo fresco y verde a lo profundo y aterciopelado segun la variedad utilizada.',
            ],
            [
                'name' => 'Almizcle',
                'slug' => 'almizcle',
                'description' => 'Nota envolvente, limpia y sensual. Aporta suavidad, cercania a piel y prolonga la duracion del perfume en el fondo.',
            ],
            [
                'name' => 'Oud',
                'slug' => 'oud',
                'description' => 'Madera preciosa de origen arabe, intensa, ahumada y resinosa. Lujo absoluto, muy persistente y reconocible.',
            ],
            [
                'name' => 'Ambar',
                'slug' => 'ambar',
                'description' => 'Acorde calido y resinoso construido con balsamos y vainilla. Da sensacion de abrigo, dulzura seca y estela oriental.',
            ],
            [
                'name' => 'Haba tonka',
                'slug' => 'haba-tonka',
                'description' => 'Semilla que combina vainilla, almendra y heno cortado. Aporta dulzor amaderado y un toque adictivo al fondo.',
            ],
            [
                'name' => 'Limon',
                'slug' => 'limon',
                'description' => 'Citrico vibrante y energetico. Da frescura inmediata en la salida y abre el perfume con un caracter limpio.',
            ],
            [
                'name' => 'Incienso',
                'slug' => 'incienso',
                'description' => 'Resina sagrada, mistica y ahumada. Aporta profundidad espiritual y un aire ceremonial a perfumes orientales y amaderados.',
            ],
            [
                'name' => 'Vetiver',
                'slug' => 'vetiver',
                'description' => 'Raiz amaderada y terrosa con matices ahumados y verdes. Muy elegante, clasica en perfumeria masculina sofisticada.',
            ],
            [
                'name' => 'Pera',
                'slug' => 'pera',
                'description' => 'Nota frutal jugosa, fresca y ligeramente dulce. Aporta luminosidad y un caracter moderno y juvenil.',
            ],
            [
                'name' => 'Canela',
                'slug' => 'canela',
                'description' => 'Especia calida, dulce y picante. Da caracter oriental, aporta envoltura y se asocia a perfumes intensos de invierno.',
            ],
            [
                'name' => 'Coco',
                'slug' => 'coco',
                'description' => 'Nota tropical cremosa y dulce. Evoca playa, bronceadores y calidez golosa, muy presente en perfumes veraniegos.',
            ],
        ];

        // Extensiones por slug cuando el archivo no es .png
        $imageExtensions = [
            'coco' => 'jpg',
        ];

        foreach ($notes as $note) {
            $extension = $imageExtensions[$note['slug']] ?? 'png';
            $imagePath = '/resources/img/notes/' . $note['slug'] . '.' . $extension;

            Note::updateOrCreate(
                ['slug' => $note['slug']],
                [
                    'name' => $note['name'],
                    'description' => $note['description'],
                    'image' => $imagePath,
                ]
            );
        }
    }
}

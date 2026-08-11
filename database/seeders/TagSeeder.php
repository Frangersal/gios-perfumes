<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        Tag::updateOrCreate(['id' => 1], ['name' => 'Novedad']);
        Tag::updateOrCreate(['id' => 2], ['name' => 'Descontinuados']);
    }
}

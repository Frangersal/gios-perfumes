<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('brands');
            $table->foreignId('category_id')->constrained('categories');
            $table->string('name', 200);
            $table->string('slug', 191)->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->string('sku', 100)->unique();
            $table->string('gender', 50)->nullable();
            $table->string('olfactory_family', 100)->nullable();
            $table->string('concentration', 50)->nullable();
            $table->integer('year')->nullable();
            $table->string('country_of_origin', 100)->nullable();
            $table->string('status', 50)->default('publicado');
            $table->integer('discount_percentage')->nullable();
            
            // SEO y Multimedia
            $table->string('video_url', 255)->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords', 255)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

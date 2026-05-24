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
            $table->string('nombre', 200);
            $table->string('slug', 191)->unique();
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 10, 2);
            $table->decimal('precio_descuento', 10, 2)->nullable();
            $table->decimal('costo', 10, 2)->nullable();
            $table->string('sku', 100)->unique();
            $table->string('genero', 50)->nullable();
            $table->string('familia_olfativa', 100)->nullable();
            $table->string('concentracion', 50)->nullable();
            $table->integer('anio')->nullable();
            $table->string('pais_origen', 100)->nullable();
            $table->string('estado', 50)->default('publicado');
            $table->integer('porcentaje_descuento')->nullable();
            
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

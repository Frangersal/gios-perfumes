<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('note_id')->constrained('notes')->onDelete('cascade');
            $table->foreignId('note_type_id')->nullable()->constrained('note_types')->nullOnDelete();
            $table->unsignedInteger('position')->nullable();
            $table->unsignedTinyInteger('intensity')->nullable();
            $table->timestamps();

            $table->unique(['product_id', 'note_id', 'note_type_id'], 'product_note_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_notes');
    }
};

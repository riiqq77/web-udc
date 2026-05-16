<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('prestasi', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lomba');
            $table->string('tingkat');
            $table->string('juara');
            $table->year('tahun');
            $table->text('deskripsi')->nullable();
            $table->string('dokumentasi')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('prestasi'); }
};

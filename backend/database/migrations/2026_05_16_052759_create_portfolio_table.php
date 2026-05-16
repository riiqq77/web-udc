<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('portfolio', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anggota_id')->nullable()->constrained('anggota')->nullOnDelete();
            $table->foreignId('divisi_id')->nullable()->constrained('divisi')->nullOnDelete();
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('media_url')->nullable();
            $table->string('kategori')->nullable();
            $table->json('tags')->nullable();
            $table->year('tahun')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('portfolio'); }
};

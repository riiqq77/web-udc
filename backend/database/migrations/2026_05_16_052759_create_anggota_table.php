<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('anggota', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('divisi_id')->nullable()->constrained('divisi')->nullOnDelete();
            $table->string('nama_lengkap');
            $table->string('jabatan')->nullable();
            $table->string('foto')->nullable();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('github')->nullable();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->year('angkatan')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('anggota'); }
};

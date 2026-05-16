<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('divisi', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->string('warna', 7)->default('#700143');
            $table->unsignedBigInteger('ketua_id')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('divisi'); }
};

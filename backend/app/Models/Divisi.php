<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    use HasFactory;
    protected $table = 'divisi';
    protected $fillable = ['nama', 'deskripsi', 'warna', 'ketua_id'];

    public function ketua() { return $this->belongsTo(Anggota::class, 'ketua_id'); }
    public function anggota() { return $this->hasMany(Anggota::class); }
    public function portfolio() { return $this->hasMany(Portfolio::class); }
    public function pendaftaran() { return $this->hasMany(Pendaftaran::class); }
}

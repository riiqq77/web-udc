<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;
    protected $table = 'portfolio';
    protected $fillable = ['anggota_id', 'divisi_id', 'judul', 'deskripsi', 'thumbnail', 'media_url', 'kategori', 'tags', 'tahun'];
    protected $casts = ['tags' => 'array'];

    public function anggota() { return $this->belongsTo(Anggota::class); }
    public function divisi() { return $this->belongsTo(Divisi::class); }
}

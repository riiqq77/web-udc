<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $table = 'kegiatan';
    protected $fillable = ['judul', 'deskripsi', 'tanggal', 'lokasi', 'foto'];
    protected $casts = ['tanggal' => 'date'];
}

<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;
    protected $table = 'pendaftaran';
    protected $fillable = ['divisi_id', 'nama', 'email', 'telepon', 'nim', 'jurusan', 'cv_path', 'portfolio_path', 'motivasi', 'status'];

    public function divisi() { return $this->belongsTo(Divisi::class); }
}

<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anggota extends Model
{
    use HasFactory;
    protected $table = 'anggota';
    protected $fillable = ['user_id', 'divisi_id', 'nama_lengkap', 'jabatan', 'foto', 'instagram', 'linkedin', 'github', 'status', 'angkatan'];

    public function user() { return $this->belongsTo(User::class); }
    public function divisi() { return $this->belongsTo(Divisi::class); }
    public function portfolio() { return $this->hasMany(Portfolio::class); }
}

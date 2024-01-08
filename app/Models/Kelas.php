<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $table = 'kelas';

    protected $primaryKey = 'id_kelas';

    protected $fillable = [
        'name',
        'image',
        'id_level',
        'description'
    ];

    protected $casts = [
        'id_kelas' => 'integer',
        'name' => 'string',
        'image' => 'string',
        'id_level' => 'integer',
        'description' => 'string'
    ];

    // level
    public function level()
    {
        return $this->hasOne(LevelKelas::class, 'id_level', 'id_level');
    }

    // materi
    public function materi()
    {
        return $this->hasMany(Materi::class, 'id_kelas', 'id_kelas');
    }

    // quiz
    public function quiz()
    {
        return $this->hasMany(Quiz::class, 'id_kelas', 'id_kelas')->with('options');
    }
}

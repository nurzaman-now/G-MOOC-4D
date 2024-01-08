<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LevelKelas extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'level_kelas';

    protected $primaryKey = 'id_level';

    protected $fillable = [
        'name',
        'description'
    ];

    protected $casts = [
        'id_level' => 'integer',
        'name' => 'string',
        'description' => 'string'
    ];

    protected $hidden = [
        'deleted_at'
    ];

    public function kelas()
    {
        return $this->hasMany(Kelas::class, 'id_level', 'id_level')->with(['materi', 'quiz']);
    }
}

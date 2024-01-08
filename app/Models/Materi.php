<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materi extends Model
{
    use HasFactory;

    protected $table = 'materi';

    protected $primaryKey = 'id_materi';

    protected $fillable = [
        'id_kelas',
        'name',
        'materi',
        'url',
        'durasi',
        'poin'
    ];

    protected $casts = [
        'id_materi' => 'integer',
        'id_kelas' => 'integer',
        'name' => 'string',
        'materi' => 'string',
        'url' => 'string',
        'durasi' => 'float',
        'poin' => 'integer'
    ];
}

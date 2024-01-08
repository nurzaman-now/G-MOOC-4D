<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MateriHistory extends Model
{
    use HasFactory;

    protected $table = 'materi_histories';

    protected $primaryKey = 'id_materi_history';

    protected $fillable = [
        'id_enrollment',
        'id_materi',
        'playback',
        'status'
    ];

    protected $casts = [
        'id_materi_history' => 'integer',
        'id_enrollment' => 'integer',
        'id_materi' => 'integer',
        'playback' => 'float',
        'status' => 'string'
    ];

    protected $hidden = [
        'deleted_at'
    ];

    public function materi()
    {
        return $this->hasOne(Materi::class, 'id_materi', 'id_materi');
    }
}

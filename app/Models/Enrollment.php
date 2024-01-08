<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollments';

    protected $primaryKey = 'id_enrollment';

    protected $fillable = [
        'id_user',
        'id_kelas',
        'status',
        'quiz_count',
    ];

    protected $casts = [
        'id_enrollment' => 'integer',
        'id_user' => 'integer',
        'id_kelas' => 'integer',
        'status' => 'string',
        'quiz_count' => 'integer',
    ];

    protected $hidden = [
        'deleted_at',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id_user', 'id_user');
    }

    public function kelas()
    {
        return $this->hasOne(Kelas::class, 'id_kelas', 'id_kelas')->with(['materi', 'quiz']);
    }

    public function materiHistory()
    {
        return $this->hasMany(MateriHistory::class, 'id_enrollment', 'id_enrollment');
    }

    public function quizHistory()
    {
        return $this->hasMany(QuizHistory::class, 'id_enrollment', 'id_enrollment')->with('option');
    }
}

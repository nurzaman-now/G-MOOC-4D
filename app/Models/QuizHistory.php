<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizHistory extends Model
{
    use HasFactory;

    protected $table = 'quiz_histories';

    protected $primaryKey = 'id_quiz_history';

    protected $fillable = [
        'id_enrollment',
        'id_option',
        'id_quiz',
        'status'
    ];

    protected $casts = [
        'id_quiz_history' => 'integer',
        'id_enrollment' => 'integer',
        'id_option' => 'integer',
        'id_quiz' => 'integer',
        'status' => 'string'
    ];

    protected $hidden = [
        'deleted_at'
    ];

    public function option()
    {
        return $this->hasOne(QuizOptions::class, 'id_option', 'id_option');
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class, 'id_quiz', 'id_quiz');
    }
}

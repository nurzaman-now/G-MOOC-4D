<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $table = 'quiz';

    protected $primaryKey = 'id_quiz';

    protected $fillable = [
        'id_kelas',
        'question',
        'true_answer',
    ];

    protected $casts = [
        'id_quiz' => 'integer',
        'id_kelas' => 'integer',
        'question' => 'string',
        'true_answer' => 'string',
    ];

    // answer
    public function options()
    {
        return $this->hasMany(QuizOptions::class, 'id_quiz', 'id_quiz');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizOptions extends Model
{
    use HasFactory;

    protected $table = 'quiz_options';

    protected $primaryKey = 'id_option';

    protected $fillable = [
        'id_quiz',
        'kunci',
        'option',
    ];

    protected $casts = [
        'id_option' => 'integer',
        'id_quiz' => 'integer',
        'kunci' => 'string',
        'option' => 'string',
    ];

    protected $hidden = [
        'deleted_at',
    ];

    public function quiz()
    {
        return $this->hasOne(Quiz::class, 'id_quiz', 'id_quiz');
    }
}

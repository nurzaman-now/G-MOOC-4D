<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Quiz extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            [
                'id_quiz' => 1,
                'id_kelas' => 1,
                'question' => 'Apa pengertian dari Javascript?',
                'true_answer' => 'A'
            ],
            [
                'id_quiz' => 2,
                'id_kelas' => 1,
                'question' => 'Javascript dibuat oleh?',
                'true_answer' => 'B'
            ],
            [
                'id_quiz' => 3,
                'id_kelas' => 2,
                'question' => 'Apa pengertian dari PHP?',
                'true_answer' => 'B'
            ],
            [
                'id_quiz' => 4,
                'id_kelas' => 2,
                'question' => 'PHP dibuat oleh?',
                'true_answer' => 'A'
            ],
            [
                'id_quiz' => 5,
                'id_kelas' => 3,
                'question' => 'Apa pengertian dari Python?',
                'true_answer' => 'A'
            ],
            [
                'id_quiz' => 6,
                'id_kelas' => 3,
                'question' => 'Python dibuat oleh?',
                'true_answer' => 'B'
            ],
            [
                'id_quiz' => 7,
                'id_kelas' => 4,
                'question' => 'Apa pengertian dari HTML?',
                'true_answer' => 'A'
            ],
            [
                'id_quiz' => 8,
                'id_kelas' => 4,
                'question' => 'HTML dibuat oleh?',
                'true_answer' => 'B'
            ],
            [
                'id_quiz' => 9,
                'id_kelas' => 5,
                'question' => 'Apa pengertian dari CSS?',
                'true_answer' => 'A'
            ],
            [
                'id_quiz' => 10,
                'id_kelas' => 5,
                'question' => 'CSS dibuat oleh?',
                'true_answer' => 'B'
            ],
            [
                'id_quiz' => 11,
                'id_kelas' => 6,
                'question' => 'Apa pengertian dari Java?',
                'true_answer' => 'A'
            ],
            [
                'id_quiz' => 12,
                'id_kelas' => 6,
                'question' => 'Java dibuat oleh?',
                'true_answer' => 'B'
            ]
        ];

        foreach ($rules as $rule) {
            \App\Models\Quiz::create($rule);
        }
    }
}

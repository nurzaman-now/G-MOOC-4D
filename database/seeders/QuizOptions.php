<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizOptions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            // javascript 
            [
                'id_quiz' => 1,
                'kunci' => 'A',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat website'
            ],
            [
                'id_quiz' => 1,
                'kunci' => 'B',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi mobile'
            ],
            [
                'id_quiz' => 1,
                'kunci' => 'C',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi desktop'
            ],
            // javascript dibuat oleh
            [
                'id_quiz' => 2,
                'kunci' => 'A',
                'option' => 'Brendan Eich'
            ],
            [
                'id_quiz' => 2,
                'kunci' => 'B',
                'option' => 'Guido van Rossum'
            ],
            [
                'id_quiz' => 2,
                'kunci' => 'C',
                'option' => 'Rasmus Lerdorf'
            ],
            // php
            [
                'id_quiz' => 3,
                'kunci' => 'A',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat website'
            ],
            [
                'id_quiz' => 3,
                'kunci' => 'B',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi mobile'
            ],
            [
                'id_quiz' => 3,
                'kunci' => 'C',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi desktop'
            ],
            // php dibuat oleh
            [
                'id_quiz' => 4,
                'kunci' => 'A',
                'option' => 'Rasmus Lerdorf'
            ],
            [
                'id_quiz' => 4,
                'kunci' => 'B',
                'option' => 'Brendan Eich'
            ],
            [
                'id_quiz' => 4,
                'kunci' => 'C',
                'option' => 'Guido van Rossum'
            ],
            // python
            [
                'id_quiz' => 5,
                'kunci' => 'A',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat website'
            ],
            [
                'id_quiz' => 5,
                'kunci' => 'B',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi mobile'
            ],
            [
                'id_quiz' => 5,
                'kunci' => 'C',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi desktop'
            ],
            // python dibuat oleh 
            [
                'id_quiz' => 6,
                'kunci' => 'A',
                'option' => 'Guido van Rossum'
            ],
            [
                'id_quiz' => 6,
                'kunci' => 'B',
                'option' => 'Brendan Eich'
            ],
            [
                'id_quiz' => 6,
                'kunci' => 'C',
                'option' => 'Rasmus Lerdorf'
            ],
            // html
            [
                'id_quiz' => 7,
                'kunci' => 'A',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat website'
            ],
            [
                'id_quiz' => 7,
                'kunci' => 'B',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi mobile'
            ],
            [
                'id_quiz' => 7,
                'kunci' => 'C',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi desktop'
            ],
            // html dibuat oleh
            [
                'id_quiz' => 8,
                'kunci' => 'A',
                'option' => 'Brendan Eich'
            ],
            [
                'id_quiz' => 8,
                'kunci' => 'B',
                'option' => 'Guido van Rossum'
            ],
            [
                'id_quiz' => 8,
                'kunci' => 'C',
                'option' => 'Rasmus Lerdorf'
            ],
            // css
            [
                'id_quiz' => 9,
                'kunci' => 'A',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat website'
            ],
            [
                'id_quiz' => 9,
                'kunci' => 'B',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi mobile'
            ],
            [
                'id_quiz' => 9,
                'kunci' => 'C',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi desktop'
            ],
            // css dibuat oleh
            [
                'id_quiz' => 10,
                'kunci' => 'A',
                'option' => 'Guido van Rossum'
            ],
            [
                'id_quiz' => 10,
                'kunci' => 'B',
                'option' => 'Brendan Eich'
            ],
            [
                'id_quiz' => 10,
                'kunci' => 'C',
                'option' => 'Rasmus Lerdorf'
            ],
            // java
            [
                'id_quiz' => 11,
                'kunci' => 'A',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat website'
            ],
            [
                'id_quiz' => 11,
                'kunci' => 'B',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi mobile'
            ],
            [
                'id_quiz' => 11,
                'kunci' => 'C',
                'option' => 'Bahasa pemrograman yang digunakan untuk membuat aplikasi desktop'
            ],
            // java dibuat oleh
            [
                'id_quiz' => 12,
                'kunci' => 'A',
                'option' => 'Guido van Rossum'
            ],
            [
                'id_quiz' => 12,
                'kunci' => 'B',
                'option' => 'Brendan Eich'
            ],
            [
                'id_quiz' => 12,
                'kunci' => 'C',
                'option' => 'Rasmus Lerdorf'
            ],
        ];

        foreach ($rules as $rule) {
            \App\Models\QuizOptions::create($rule);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Kelas extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            [
                'id_kelas' => 1,
                'name' => 'Javascript',
                'description' => 'JavaScript adalah bahasa pemrograman tingkat tinggi untuk membuat situs web interaktif.',
                'image' => null,
                'id_level' => 1
            ],
            [
                'id_kelas' => 2,
                'name' => 'PHP',
                'description' => 'PHP adalah bahasa skrip dengan fungsi umum yang terutama digunakan untuk pengembangan web.',
                'image' => null,
                'id_level' => 2
            ],
            [
                'id_kelas' => 3,
                'name' => 'Python',
                'description' => 'Python adalah bahasa pemrograman interpretatif yang menekankan keterbacaan kode.',
                'image' => null,
                'id_level' => 3
            ],
            [
                'id_kelas' => 4,
                'name' => 'HTML',
                'description' => 'HTML(Hypertext Markup Language) adalah bahasa markup untuk dokumen web.',
                'image' => null,
                'id_level' => 1
            ],
            [
                'id_kelas' => 5,
                'name' => 'CSS',
                'description' => 'CSS (Cascading Style Sheets) adalah bahasa untuk mengatur tampilan dokumen HTML.',
                'image' => null,
                'id_level' => 2
            ],
            [
                'id_kelas' => 6,
                'name' => 'Java',
                'description' => 'Java adalah bahasa pemrograman yang dapat dijalankan di berbagai komputer termasuk telepon genggam.',
                'image' => null,
                'id_level' => 3
            ]
        ];

        foreach ($rules as $rule) {
            \App\Models\Kelas::create($rule);
        }
    }
}

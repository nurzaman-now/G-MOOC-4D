<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelKelas extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            [
                'id_level' => 1,
                'name' => 'Mudah',
                'description' => 'Materi yang mudah dipahami'
            ],
            [
                'id_level' => 2,
                'name' => 'Normal',
                'description' => 'Materi yang biasa saja'
            ],
            [
                'id_level' => 3,
                'name' => 'Sulit',
                'description' => 'Materi yang sulit dipahami'
            ]
        ];

        foreach ($rules as $rule) {
            \App\Models\LevelKelas::create($rule);
        }
    }
}

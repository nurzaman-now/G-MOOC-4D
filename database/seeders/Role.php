<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Role extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            [
                'name' => 'Admin',
                'description' => 'This is the admin role.',
            ],
            [
                'name' => 'User',
                'description' => 'This is the user role.',
            ],
        ];

        foreach ($rules as $rule) {
            \App\Models\Role::create($rule);
        }
    }
}

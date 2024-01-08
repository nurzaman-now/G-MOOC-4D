<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class User extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            [
                'name' => 'Admin Voicesee',
                'email' => 'voicesee@nurz.site',
                'id_role' => 1,
                'email_verified_at' => now(),
                'password' => bcrypt('admin123'),
                'faceId' => 'admin-123456543345'
            ],
        ];

        foreach ($rules as $rule) {
            \App\Models\User::create($rule);
        }
    }
}

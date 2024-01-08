<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';

    protected $primaryKey = 'id_role';

    protected $fillable = [
        'name',
        'description',
    ];

    protected $casts = [
        'id_role' => 'integer',
        'name' => 'string',
        'description' => 'string',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}

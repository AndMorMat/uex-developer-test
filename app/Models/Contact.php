<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cpf',
        'phone'
    ];

    public function address() {
        return $this->hasMany(Address::class);
    }
}

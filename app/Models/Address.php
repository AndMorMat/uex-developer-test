<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'zip_code',
        'address',
        'city',
        'province',
        'neighborhood',
    ];

    public function contact() {
        return $this->belongsTo(Contact::class);
    }
}

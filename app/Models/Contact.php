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
        'phone',
        'user_id'
    ];

    public function address() {
        return $this->hasOne(Address::class);
    }

    protected static function booted() {
        static::deleting(function ($contact) {
            if ($contact->address) {
                $contact->address->delete();
            }
        });
    }
}

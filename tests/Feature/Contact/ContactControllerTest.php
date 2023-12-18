<?php

namespace Tests\Feature\Contact;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

#php artisan test --filter=ContactControllerTest.php
class ContactControllerTest extends TestCase
{
    use RefreshDatabase;
    protected $contactParams;
    protected function setUp(): void
    {
        parent::setUp();
        $user = User::factory()->create();
        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->json();
        $this->contactParams = [
            'name' => 'Contact name - Test',
            'cpf' => '41239469845',
            'phone' => '41984606335',
            'address' => [
                'zip_code' => '81330280',
                'address' => 'Antonio Vivaldi',
                'neighborhood' => 'Fazendinha',
                'city' => 'Curitiba',
                'province' => 'PR'
            ]
        ];
    }

    public function test_can_create_contact_with_valid_cpf(): void
    {
        $response = $this->post('/api/contact-add', $this->contactParams)->json();
        $this->assertEquals($response['success'], 1);
        $this->assertEquals($response['message'], 'Registro inserido com sucesso');
    }

    public function test_cannot_create_contact_with_invalid_cpf(): void
    {
        $this->expectException(\Illuminate\Validation\ValidationException::class);
        $this->withoutExceptionHandling();

        $this->contactParams['cpf'] = 'Invalid cpf';
        $this->postJson('/api/contact-add', $this->contactParams);
    }

    public function test_cannot_create_contact_without_address(): void
    {
        $this->expectException(\Illuminate\Validation\ValidationException::class);
        $this->withoutExceptionHandling();

        $this->contactParams['address'] = [];
        $this->postJson('/api/contact-add', $this->contactParams);
    }
}

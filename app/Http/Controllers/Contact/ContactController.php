<?php

namespace App\Http\Controllers\Contact;

use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Response\ApiResponse;
use App\Models\Address;
use App\Models\Contact;
use App\Services\CepService\CepService;
use App\Services\CepService\Providers\Viacep\ViacepService;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;

/**
 * Andre Matos <andre_matos13@hotmail.com>
**/
class ContactController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::orderBy('id', 'desc')->limit(20)->get();
        return view('contact.contacts', ['contacts'=>$contacts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|max:255',
                // 'cpf' => 'required|cpf_ou_cnpj',
                'address.neighborhood' => 'required'
              ]);

            } catch (\Throwable $e) {
                throw new ApiException($e->getMessage());
            }

            $contact = Contact::create($request->all());
            $address = new Address($request->all()['address']);
            $contact->address()->save($address);

        return new ApiResponse('Registro inserido com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Http\Response\ApiResponse;
use App\Models\Contact;
use App\Services\ContactService\ContactService;
use Illuminate\Http\Request;

/**
 * Andre Matos <andre_matos13@hotmail.com>
**/
class ContactController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchParam = $request->get('q');
        $contactService = new ContactService();
        $contacts = $contactService->searchContacts($searchParam);
        return new ApiResponse('Consulta realizada com sucesso', $contacts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $contactService = new ContactService();
        $request->validate($contactService->getValidation());
        $contactService->addContact($request->all());
        return new ApiResponse('Registro inserido com sucesso');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contact = Contact::with('address')->findOrFail($id)->toArray();
        return new ApiResponse('Consulta realizada com sucesso', $contact);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $contactService = new ContactService();
        $request->validate($contactService->getValidation());
        $contactService->updateContact($id, $request->all());
        return new ApiResponse('Registro alterado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Contact::destroy($id);
        return new ApiResponse('Registro removido com sucesso');
    }
}

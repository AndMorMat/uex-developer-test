<?php
namespace App\Services\ContactService;

use App\Exceptions\ApiException;
use App\Models\Address;
use App\Models\Contact;
use App\Services\GeoLocationService\GeoLocationService;
use App\Services\GeoLocationService\Model\GeoLocationParams;
use App\Services\GeoLocationService\Providers\Google\GoogleService;
use Illuminate\Support\Facades\Auth;

/**
 * Andre Matos <andre_matos13@hotmail.com>
**/
class ContactService {

    /**
     * @var GeoLocationService
     */
    private $geolocationService;

    /**
     * @var User
     */
    private $authUser;

    private $perPage = 5;

    public function __construct() {
        $this->geolocationService = new GeoLocationService(new GoogleService());
        $this->authUser = Auth::user();
    }

    public function getValidation() {
        return [
            'name' => 'required|max:255',
            'cpf' => 'required|string|cpf_ou_cnpj',
            'address.zip_code' => 'required|integer',
            'address.neighborhood' => 'required',
            'address.city' => 'required',
            'address.province' => 'required'
        ];
    }

    public function searchContacts($searchParam = null, $page = 1) {

        if($searchParam) {
            return Contact::with('address')
                ->where('user_id', $this->authUser->id)
                ->where(function ($query) use ($searchParam) {
                    $query->where('name', 'LIKE', "%$searchParam%")
                        ->orWhere('cpf', $searchParam);
                })
                ->orderBy('name', 'asc')
                ->paginate($this->perPage, ['*'], 'page', $page)
                ->toArray();
        }

        return Contact::with('address')
                    ->where('user_id', $this->authUser->id)
                    ->orderBy('name', 'asc')
                    ->paginate($this->perPage, ['*'], 'page', $page)
                    ->toArray();
    }

    public function addContact($params) {
        $coordinatesParams = new GeoLocationParams(
            $params['address']['province'],
            $params['address']['city'],
            $params['address']['address'],
        );

        $coordinates = $this->geolocationService->getCoordinates($coordinatesParams);
        $params['user_id'] = $this->authUser->id;
        $contact = Contact::create($params);

        $params['address']['lat'] = $coordinates['lat'];
        $params['address']['long'] = $coordinates['lng'];

        $address = new Address($params['address']);
        $contact->address()->save($address);
    }

    public function updateContact($id, $params) {
        $contact = Contact::findOrFail($id);
        if(!$contact) {
            throw new ApiException('Contato não encontrado');
        }

        $coordinatesParams = new GeoLocationParams(
            $params['address']['province'],
            $params['address']['city'],
            $params['address']['address'],
        );

        $coordinates = $this->geolocationService->getCoordinates($coordinatesParams);
        $contact->update($params);
        $params['address']['lat'] = $coordinates['lat'];
        $params['address']['long'] = $coordinates['lng'];
        $contact->address->update($params['address']);
    }


}

<?php
namespace App\Services\GeoLocationService\Providers\Google;

use App\Services\GeoLocationService\Interfaces\GeoLocationProviderInterface;
use App\Services\GeoLocationService\Model\GeoLocationParams;
use App\Services\GeoLocationService\Providers\Google\Comunication\GoogleRequest;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class GoogleService implements GeoLocationProviderInterface {

    /**
     * @var GoogleRequest
     */
    private $request;

    public function __construct() {
        $this->request = new GoogleRequest();
    }

    /**
     * @param GeoLocationParams $params
     */
    public function getCoordinates(GeoLocationParams $params): array
    {
        $response = $this->request->get($params);

        return $response['results'][0]['geometry']['location'];
    }

}

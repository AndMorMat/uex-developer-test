<?php
namespace App\Services\GeoLocationService\Providers\Google\Comunication;

use App\Exceptions\ApiException;
use App\Services\GeoLocationService\Model\GeoLocationParams;
use Illuminate\Support\Facades\Http;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class GoogleRequest {

    /**
     * @var string
     */
    private $baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s';

    /**
     * @param GeoLocationParams $params
     */
    public function get(GeoLocationParams $params): array {
        $response = Http::get(
            sprintf(
                $this->baseUrl,
                $params->getCompleteAddres(),
                getenv('VITE_GOOGLE_MAPS_API_KEY')
            )
        );
        if($response->failed()) {
            throw new ApiException('Falha ao buscar o cep');
        }
        return json_decode($response, true);
    }
}

<?php

namespace App\Services\GeoLocationService;

use App\Services\GeoLocationService\Interfaces\GeoLocationProviderInterface;
use App\Services\GeoLocationService\Model\GeoLocationParams;

/**
 * Andre Matos <andre_matos13@hotmail.com>
**/
class GeoLocationService {

    /**
     * @var GeoLocationProviderInterface
     */
    private $handleGeolocation;

    /**
     * @param GeoLocationProviderInterface $provider
     */
    public function __construct(GeoLocationProviderInterface $provider) {
        $this->handleGeolocation = $provider;
    }

    /**
     * @param GeoLocationParams $params
     * @return array
     */
    public function getCoordinates(GeoLocationParams $params): array {
        return $this->handleGeolocation->getCoordinates($params);
    }
}

<?php

namespace App\Services\GeoLocationService\Interfaces;

use App\Services\GeoLocationService\Model\GeoLocationParams;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
interface GeoLocationProviderInterface {
    public function getCoordinates(GeoLocationParams $params): array;
}

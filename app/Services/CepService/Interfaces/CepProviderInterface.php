<?php

namespace App\Services\CepService\Interfaces;

use App\Services\CepService\Model\SearchAddressParams;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
interface CepProviderInterface {
    public function getCep(string $cep): array;
    public function getStreet(SearchAddressParams $cep): array;
}

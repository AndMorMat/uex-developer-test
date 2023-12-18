<?php
namespace App\Services\CepService;

use App\Services\CepService\Interfaces\CepProviderInterface;
use App\Services\CepService\Model\SearchAddressParams;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class CepService {

    /**
     * @var CepProviderInterface
     */
    private $handleCep;

    /**
     * @params CepProviderInterface $provider
     */
    public function __construct(CepProviderInterface $provider) {
        $this->handleCep = $provider;
    }

    /**
     * @param string $cep
     * @return array
     */
    public function get(string $cep): array {
        return $this->handleCep->getCep($cep);
    }

    /**
     * @param SearchAddressParams $params
     * @return array
     */
    public function getStreet(SearchAddressParams $params): array {
        return $this->handleCep->getStreet($params);
    }
}

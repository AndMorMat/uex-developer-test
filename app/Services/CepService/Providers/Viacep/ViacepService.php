<?php
namespace App\Services\CepService\Providers\Viacep;

use App\Services\CepService\Interfaces\CepProviderInterface;
use App\Services\CepService\Model\SearchAddressParams;
use App\Services\CepService\Providers\Viacep\Comunication\ViacepRequest;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class ViacepService implements CepProviderInterface {

    /**
     * @var ViacepRequest
     */
    private $request;

    public function __construct() {
        $this->request = new ViacepRequest();
    }

    /**
     * @param string $cep
     * @return array
     */
    public function getCep(string $cep): array {
        return $this->request->get($cep);
    }

    /**
     * @param SearchAddressParams $params
     * @return array
     */
    public function getStreet(SearchAddressParams $params): array {
        return $this->request->getStreet($params);
    }
}

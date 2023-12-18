<?php
namespace App\Services\CepService\Providers\Viacep\Comunication;

use App\Exceptions\ApiException;
use App\Services\CepService\Model\SearchAddressParams;
use Illuminate\Support\Facades\Http;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class ViacepRequest {

    /**
     * @var string
     */
    private $baseUrl = 'https://viacep.com.br/ws';

    /**
     * @var string
     */
    private $addressByCepUrl = '/%s/json/';

    /**
     * @var string
     */
    private $searchStreetUrl = '/%s/%s/%s/json/';

    /**
     * @param string $cep
     * @return array
     */
    public function get(string $cep): array {
        $response = Http::get(sprintf($this->baseUrl.$this->addressByCepUrl, $cep));
        if($response->failed()) {
            throw new ApiException('Falha ao buscar o cep');
        }
        return json_decode($response, true);
    }

    /**
     * @param SearchAddressParams $params
     * @return array
     */
    public function getStreet(SearchAddressParams $params): array {
        $response = Http::get(sprintf(
            $this->baseUrl.$this->searchStreetUrl,
            $params->getProvince(),
            $params->getCity(),
            $params->getSearchParam())
        );

        if($response->failed()) {
            throw new ApiException('Falha ao buscar o endereço');
        }

        return json_decode($response, true);
    }
}

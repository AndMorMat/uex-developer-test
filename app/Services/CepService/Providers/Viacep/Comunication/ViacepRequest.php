<?php
namespace App\Services\CepService\Providers\Viacep\Comunication;

use App\Exceptions\ApiException;
use Illuminate\Support\Facades\Http;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class ViacepRequest {

    private $baseUrl = 'https://viacep.com.br/ws/%s/json/';

    public function get(string $cep): array {
        $response = Http::get(sprintf($this->baseUrl, $cep));

        if($response->failed()) {
            throw new ApiException('Falha ao buscar o cep');
        }

        return json_decode($response, true);
    }
}

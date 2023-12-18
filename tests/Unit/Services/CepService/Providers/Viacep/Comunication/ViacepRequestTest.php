<?php

namespace Tests\Unit;

use App\Services\CepService\Model\SearchAddressParams;
use App\Services\CepService\Providers\Viacep\Comunication\ViacepRequest;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ViacepRequestTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_should_return_a_valid_address_from_cep(): void
    {
        $viacepRequest = new ViacepRequest();
        $address = $viacepRequest->get('81330280');

        $this->assertEquals([
            'cep' => '81330-280',
            'logradouro' => 'Rua Antônio Vivaldi',
            'complemento' => '',
            'bairro' => 'Fazendinha',
            'localidade' => 'Curitiba',
            'uf' => 'PR',
            'ibge' => '4106902',
            'gia' => '',
            'ddd' => '41',
            'siafi' => '7535',
        ], $address);
    }

    public function test_should_return_a_valid_address_from_search_param(): void
    {
        $params = new SearchAddressParams('pr', 'curitiba', 'antonio vivaldi');
        $viacepRequest = new ViacepRequest();
        $address = $viacepRequest->getStreet($params);

        $this->assertEquals([[
            'cep' => '81330-280',
            'logradouro' => 'Rua Antônio Vivaldi',
            'complemento' => '',
            'bairro' => 'Fazendinha',
            'localidade' => 'Curitiba',
            'uf' => 'PR',
            'ibge' => '4106902',
            'gia' => '',
            'ddd' => '41',
            'siafi' => '7535',
        ]], $address);
    }
}

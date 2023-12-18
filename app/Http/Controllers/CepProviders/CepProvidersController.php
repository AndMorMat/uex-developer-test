<?php

namespace App\Http\Controllers\CepProviders;

use App\Http\Controllers\Controller;
use App\Http\Response\ApiResponse;
use App\Services\CepService\CepService;
use App\Services\CepService\Model\SearchAddressParams;
use App\Services\CepService\Providers\Viacep\ViacepService;

/**
 * Andre Matos <andre_matos13@hotmail.com>
**/
class CepProvidersController extends Controller
{
    /**
     * @var CepService
     */
    private $cepService;

    public function __construct() {
        $this->cepService = new CepService(new ViacepService());
    }

    /**
     * Handle an incoming new password request.
     * @return ApiResponse
     * @throws App\Exceptions\ApiException
     */
    public function search($cepParam)
    {
        $response = $this->cepService->get($cepParam);
        return new ApiResponse('Consulta realizada com sucesso', $response);
    }

    /**
     * Handle an incoming new password request.
     * @return ApiResponse
     * @throws App\Exceptions\ApiException
     */
    public function searchStreet($province, $city, $searchParam)
    {
        $searchParams = new SearchAddressParams($province, $city, $searchParam);

        $response = $this->cepService->getStreet($searchParams);
        return new ApiResponse('Consulta realizada com sucesso', $response);
    }
}

<?php

namespace App\Http\Controllers\CepProviders;

use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Response\ApiResponse;
use App\Services\CepService\CepService;
use App\Services\CepService\Providers\Viacep\ViacepService;
use Illuminate\Http\Request;

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
     *
     * @throws App\Exceptions\ApiException
     */
    public function search(Request $request, $cep)
    {
        $response = $this->cepService->get($cep);
        return new ApiResponse('Consulta realizada com sucesso', $response);
    }
}

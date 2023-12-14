<?php
namespace App\Services\CepService\Providers\Viacep;

use App\Services\CepService\Interfaces\CepProviderInterface;
use App\Services\CepService\Providers\Viacep\Comunication\ViacepRequest;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class ViacepService implements CepProviderInterface {

    private $request;

    public function __construct() {
        $this->request = new ViacepRequest();
    }

    public function getCep($cep): array {
        return $this->request->get($cep);
    }
}

<?php
namespace App\Services\CepService;

use App\Services\CepService\Interfaces\CepProviderInterface;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class CepService {

    private $handleCep;

    public function __construct(CepProviderInterface $provider) {
        $this->handleCep = $provider;
    }

    public function get(string $cep): array {
        return $this->handleCep->getCep($cep);
    }
}

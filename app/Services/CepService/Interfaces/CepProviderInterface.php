<?php

namespace App\Services\CepService\Interfaces;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
interface CepProviderInterface {
    public function getCep(string $cep): array;
}

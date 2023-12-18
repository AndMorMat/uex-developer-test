<?php
namespace App\Services\CepService\Model;

/**
 * Andre Matos <andre_matos13@hotmail.com>
**/
class SearchAddressParams {
    /**
     * @param string $province
     * @param string $city
     * @param string $searchParam
     */
    public function __construct(private $province, private $city, private $searchParam) {
        $this->province = $province;
        $this->city = $city;
        $this->searchParam = $searchParam;
    }

    /**
     * @return string
     */
    public function getProvince(): string {
        return $this->province;
    }

    /**
     * @return string
     */
    public function getCity(): string {
        return $this->city;
    }

    /**
     * @return string
     */
    public function getSearchParam(): string {
        return $this->searchParam;
    }
}

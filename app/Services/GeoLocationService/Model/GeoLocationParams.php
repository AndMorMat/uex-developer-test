<?php
namespace App\Services\GeoLocationService\Model;

/**
 * Andre Matos <andre_matos13@hotmail.com>
**/
class GeoLocationParams {

    public function __construct(private $province, private $city, private $street) {
        $this->province = $province;
        $this->city = $city;
        $this->street = $street;
    }

    public function getProvince() {
        return $this->province;
    }

    public function getCity() {
        return $this->city;
    }

    public function getStreet() {
        return $this->street;
    }

    public function getCompleteAddres() {
        return sprintf('%s, %s, %s',
            $this->street,
            $this->city,
            $this->province
        );
    }
}

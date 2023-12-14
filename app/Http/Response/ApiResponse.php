<?php

namespace App\Http\Response;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class ApiResponse implements \JsonSerializable{

    /**
     * @param $message string
     * @param $content array
     * @param $success boolean
     */
    public function __construct(
        public string $message,
        public array|null $content = [],
        public bool $success = true
    ) {
        $this->success = $success;
        $this->message = $message;
        $this->content = $content;
    }

    public function jsonSerialize() {
        $vars = get_object_vars($this);
        return $vars;
    }
}

<?php

namespace App\Http\Response;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class ApiResponseDev extends ApiResponse {

    public function __construct($message, $content = [], $success = false, public string $file, public string $line) {
        parent::__construct($message, $content, $success);
        $this->file = $file;
        $this->line = $line;
    }
}

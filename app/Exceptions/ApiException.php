<?php

namespace App\Exceptions;

use App\Http\Response\ApiResponse;
use App\Http\Response\ApiResponseDev;

/**
 * @author Andre Matos <andre_matos13@hotmail.com>
 */
class ApiException extends \Exception
{

    /**
     * Report the exception.
     * @return void
     */
    public function report()
    {
        // Log into monitoring service
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        $environment = env('APP_ENV');

        $response = new ApiResponse(
            $this->getMessage(),
            null,
            false
        );

        if($environment === 'dev') {
            $response = new ApiResponseDev(
                $this->getMessage(),
                null,
                false,
                $this->getFile(),
                $this->getLine()
            );
        }

        return response($response);
    }
}

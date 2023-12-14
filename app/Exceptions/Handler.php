<?php

namespace App\Exceptions;

use App\Http\Response\ApiResponseDev;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {

        });

        $this->renderable(function (\Exception $e) {
            if(getenv('APP_ENV') === 'dev') {
                $response = new ApiResponseDev(
                    $e->getMessage(),
                    null,
                    false,
                    $e->getFile(),
                    $e->getLine()
                );
                return response($response);
            }else{
                if($e instanceof ApiException) {
                    throw $e;
                }else{
                    throw new ApiException('Ops, um erro aconteceu, já estamos trabalhando para corrigi-lo');
                }
            }
        });

        $this->renderable(function (UniqueConstraintViolationException $e) {
            throw new ApiException('Esse registro já existe');
        });
    }
}

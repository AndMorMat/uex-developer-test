<?php

namespace App\Exceptions;

use App\Http\Response\ApiResponseDev;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
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
            if($e instanceof UniqueConstraintViolationException) {
                throw new ApiException('Esse registro já existe');
            }else if($e instanceof ValidationException) {
                throw new ApiException('Falha na validação dos dados');
            }else if(!$e instanceof ApiException) {
                if(getenv('APP_ENV') === 'dev') {
                    return response(new ApiResponseDev(
                        $e->getMessage(),
                        null,
                        false,
                        $e->getFile(),
                        $e->getLine()
                    ));
                } else {

                    /**
                     * Enviar exception para algum gerenciador de logs como Sentry, e exibir
                     * uma mensagem genérica ao usuário
                    ***/
                    throw new ApiException('Ops, um erro ocorreu, já estamos trabalhando para corrigi-lo');
                }

            }
        });
    }
}

<?php

namespace App\Exceptions;

use App\Http\Controllers\API\ResponseController;
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
     * The exception handling callbacks for the application.
     */

    public function render($request, Throwable $e)
    {
        if ($request->is('api/*')) {
            $response = new ResponseController();
            if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                return $response->responseError('Anda tidak memiliki izin untuk mengakses resource ini.', 401);
            }
            return $response->responseError($e->getMessage(), 500);
        }
        return parent::render($request, $e);
    }
}

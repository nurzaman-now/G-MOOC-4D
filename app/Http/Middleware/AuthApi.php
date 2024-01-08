<?php

namespace App\Http\Middleware;

use App\Http\Controllers\API\ResponseController;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AuthApi extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        $response = new ResponseController();
        if (!$request->user()) {
            return $response->responseError('Anda tidak diberi izin akses.', 401);
        }

        return null; // Return null for authenticated admin users.
    }
}

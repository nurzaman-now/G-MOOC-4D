<?php

namespace App\Http\Middleware;

use App\Http\Controllers\API\ResponseController;
use Closure;
use Illuminate\Http\Request;

class AuthUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $response = new ResponseController();
        if ($request->user() && intval($request->user()->id_role) !== 2) {
            return $response->responseError('Anda tidak diberi izin akses.', 401);
        }
        return $next($request);
    }
}

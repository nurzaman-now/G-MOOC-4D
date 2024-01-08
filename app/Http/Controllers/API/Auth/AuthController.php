<?php

namespace App\Http\Controllers\API\Auth;

// use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\ResponseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class AuthController extends ResponseController
{
    public function sendCsrf()
    {
        return $this->sendResponse(['csrf_token' => csrf_token()], 'csrf token');
    }


    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */

    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'konfirmasi_password' => 'required|same:password',
            'faceId' => 'required',
            'host' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $input = $request->except(['host']);
            $input['password'] = bcrypt($input['password']);
            $input['id_role'] = 2;
            $host = $request['host'];
            // $images = $request->input('images');


            $user = User::create($input);
            // // // Send email verification notification
            $user->sendCustomEmailVerificationNotification($host);

            $success['name'] =  $user->name;
            // $success['name'] =  $response;
            return $this->responseSuccess($success, 'User Berhasil Mendaftar', 201);
        } catch (\Exception $e) {
            return $this->responseError('gagal daftar|' . $e->getMessage());
        }
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('voicesee')->plainTextToken;
            $success['id_user'] = $user->id_user;
            $success['name'] =  $user->name;
            return $this->responseSuccess($success, 'User Berhasil Masuk');
        } else {
            return $this->responseError('Kombinasi email dan password salah.');
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return $this->responseSuccess(['message' => 'User berhasil Logout'], 'User Berhasil Logout');
    }

    public function loginFace(Request $request)
    {
        $faceId = $request->input('faceId');
        $user = User::where('faceId', $faceId)->first();
        if ($user) {
            Auth::login($user);
            $success['token'] = $user->createToken('voicesee')->plainTextToken;
            $success['id_user'] = $user->id_user;
            $success['name'] = $user->name;

            return $this->responseSuccess($success, 'User Berhasil Masuk', 201);
        } else {
            return $this->responseError('User tidak ditemukan');
        }
    }
}

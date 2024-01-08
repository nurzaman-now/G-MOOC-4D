<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\API\ResponseController;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class EmailVerificationController extends ResponseController
{

  public function notice(Request $request)
  {
    if ($request->user()->hasVerifiedEmail()) {
      return $this->responseError('Anda sudah verifikasi.');
    }
    return $this->responseError('Verifikasi email anda.');
  }

  public function verify(Request $request)
  {
    $user = User::find($request->route('id'));
    if ($user->hasVerifiedEmail()) {
      return $this->responseError('Anda sudah verifikasi.');
    }
    if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
      return $this->responseError('Hash tidak sesuai.');
    }

    if ($user->markEmailAsVerified()) {
      event(new Verified($user));
    }

    // Mark the email as verified
    $user->markEmailAsVerified();

    return $this->responseSuccess(true, 'Berhasil Diverifikasi', 201);
  }

  public function send(Request $request): JsonResponse
  {
    $validator = Validator::make($request->all(), [
      'host' => 'required'
    ]);

    if ($validator->fails()) {
      return $this->validatorError($validator->errors());
    }

    if ($request->user()->hasVerifiedEmail()) {
      return $this->responseError('Anda sudah verifikasi.');
    }

    $host = $request->host;
    $request->user()->sendCustomEmailVerificationNotification($host);

    return $this->responseSuccess(true, 'Verifikasi Berhasil dikirim. silahkan lihat email anda', 201);
  }
}

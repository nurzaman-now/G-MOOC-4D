<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\API\ResponseController;
use App\Mail\CustomPasswordResetMail;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password as RulesPassword;

class NewPasswordController extends ResponseController
{
  public function forgotPassword(Request $request): JsonResponse
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'host' => 'required',
    ]);

    if ($validator->fails()) {
      return $this->validatorError($validator->errors());
    }

    $user = User::where('email', $request->email)->first();
    if (!$user) {
      return $this->responseError('Email tidak terdaftar.');
    }
    $token = Password::createToken($user);

    // $resetLink = $this->getCustomResetLink($request);
    $resetLink = $request->host . '?email=' . urlencode($request->email) . '&token=' . $token;

    // Send the custom reset link via email
    $status = Mail::to($request->email)->send(new CustomPasswordResetMail($resetLink));

    if ($status != null) {
      return $this->responseSuccess(true, 'Token berhasil dikirim ke email. Silahkan cek email anda!', 201);
    }

    return $this->responseError('Gagal mengirimkan token.');
  }

  public function reset(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'token' => 'required',
      'email' => 'required|email',
      'password' => ['required', 'confirmed', RulesPassword::defaults()],
    ]);

    if ($validator->fails()) {
      return $this->validatorError($validator->errors());
    }

    $user = User::where('email', $request->email)->first();
    if (!$user) {
      return $this->responseError('Email tidak terdaftar.');
    }

    $status = Password::reset(
      $request->only('email', 'password', 'password_confirmation', 'token'),
      function ($user) use ($request) {
        $user->forceFill([
          'password' => Hash::make($request->password),
          'remember_token' => Str::random(60),
        ])->save();

        $user->tokens()->delete();

        event(new PasswordReset($user));
      }
    );

    if ($status == Password::PASSWORD_RESET) {
      return $this->responseSuccess(true, 'Password berhasil di reset', 201);
    }

    return $this->responseError('Password gagal di reset. ' . $status);
  }
}

<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Auth\EmailVerificationController;
use App\Http\Controllers\API\Auth\NewPasswordController;
use App\Http\Controllers\API\EnrollmentController;
use App\Http\Controllers\API\MateriHistoryController;
use App\Http\Controllers\API\KelasController;
use App\Http\Controllers\API\LevelKelasController;
use App\Http\Controllers\API\MateriController;
use App\Http\Controllers\API\NilaiController;
use App\Http\Controllers\API\QuizController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::any('{path}', function () {
//     $response = new ResponseController();
//     return $response->responseError('Not Found', 404);
// })->where('path', '.*');


// authentication
Route::controller(AuthController::class)->group(function () {
    Route::get('csrf', 'sendCsrf');
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('login-face', 'loginFace');
    Route::get('logout', 'logout')->middleware('auth.api:sanctum');
});

// Email verification
Route::controller(EmailVerificationController::class)->group(function () {
    Route::get('/email/verify', 'notice')->middleware('auth.api:sanctum')->name('verification.notice');

    Route::get('email/verify/{id}/{hash}', 'verify')
        ->name('verification.verify');

    Route::post('email/verification-notification', 'send')
        ->middleware(['auth.api:sanctum', 'throttle:6,1'])
        ->name('verification.send');
});

// reset password
Route::controller(NewPasswordController::class)->group(function () {
    Route::post('forgot-password', 'forgotPassword');
    Route::post('reset-password', 'reset');
});

// jika sudah login dan email terverifikasi
Route::middleware(['auth.api:sanctum', 'verified.api'])->group(function () {
    // untuk user
    Route::middleware('auth.user')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('user', 'showAuth');
            Route::put('user/update', 'updateAuth');
            Route::post('user/updateImage', 'updateImage');
        });

        Route::controller(KelasController::class)->group(function () {
            Route::get('user/kelas/all', 'all');
            Route::get('user/kelasByName/{name}', 'kelasByName');
            Route::get('user/kelas/{name}', 'showByName');
            Route::get('user/kelasSearch', 'search');
        });

        Route::controller(MateriController::class)->group(function () {
            Route::get('user/materi/{id_materi}', 'show');
        });

        Route::controller(MateriHistoryController::class)->group(function () {
            Route::post('user/history/create', 'store');
        });

        Route::controller(LevelKelasController::class)->group(function () {
            Route::get('user/kelasByLevel', 'kelasByLevelUser');
            Route::get('user/kelasByLevel/{id_level}', 'show');
        });

        Route::controller(QuizController::class)->group(function () {
            Route::get('user/quiz/{id_quiz}', 'show');
        });

        Route::controller(NilaiController::class)->group(function () {
            Route::get('user/leaderboard', 'leaderboard');
            Route::get('user/rapor', 'show');
        });

        Route::controller(EnrollmentController::class)->group(function () {
            Route::get('user/enrollment/{name}', 'show');
            Route::put('user/enrollment/materi/update/{id_materi_history}', 'updateMateri');
            Route::put('user/enrollment/quiz/update/{id_quiz_history}', 'updateQuiz');
            Route::get('user/enrollment/rekap/{id_enrollment}', 'rekap');
        });
    });

    // untuk admin
    Route::middleware('auth.admin')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('admin', 'showAuth');
            Route::get('admin/user/all', 'index');
            Route::get('admin/user/progress', 'showProgress');
            Route::get('admin/user/progressByKelas/{id_kelas}', 'showProgressByKelas');
            Route::get('admin/user/{id_user}', 'show');
            Route::delete('admin/user/delete/{id_user}', 'destroy');
        });

        Route::controller(KelasController::class)->group(function () {
            Route::get('admin/kelas/all', 'index');
            Route::get('admin/kelas/{id_kelas}', 'show');
            Route::get('admin/kelasSearch', 'search');
            Route::post('admin/kelas/create', 'store');
            Route::post('admin/kelas/update/{id_kelas}', 'update');
            Route::delete('admin/kelas/delete/{id_kelas}', 'destroy');
        });

        Route::controller(MateriController::class)->group(function () {
            Route::get('admin/materi/all', 'index');
            Route::get('admin/materi/{id_materi}', 'show');
            Route::get('admin/materiByKelas/{id_kelas}', 'showByKelas');
            Route::get('admin/materiSearch', 'search');
            Route::post('admin/materi/create', 'store');
            Route::put('admin/materi/update/{id_materi}', 'update');
            Route::delete('admin/materi/delete/{id_materi}', 'destroy');
        });

        Route::controller(LevelKelasController::class)->group(function () {
            Route::get('admin/levelKelas/all', 'index');
            Route::get('admin/kelasByLevel', 'kelasByLevel');
            Route::get('admin/levelKelas/{id_level}', 'show');
            Route::post('admin/levelKelas/create', 'store');
            Route::put('admin/levelKelas/update/{id_level}', 'update');
            Route::delete('admin/levelKelas/delete/{id_level}', 'destroy');
        });

        Route::controller(QuizController::class)->group(function () {
            Route::get('admin/quiz/all', 'index');
            Route::get('admin/quiz/{id_quiz}', 'show');
            Route::get('admin/quizByKelas/{id_kelas}', 'showByKelas');
            Route::get('admin/quizSearch', 'search');
            Route::post('admin/quiz/create', 'store');
            Route::put('admin/quiz/update/{id_quiz}', 'update');
            Route::delete('admin/quiz/delete/{id_quiz}', 'destroy');
        });

        Route::controller(NilaiController::class)->group(function () {
            Route::get('admin/leaderboard', 'leaderboard');
            Route::get('admin/leaderboard/search', 'search');
            Route::get('admin/nilai/{id_kelas}', 'getByKelas');
        });
    });
});

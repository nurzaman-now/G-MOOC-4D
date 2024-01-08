<?php

namespace App\Http\Controllers\API;

use App\EnumsStatus;
use App\Models\Enrollment;
use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->get();
        return $this->responseSuccess($users, 'Data Users Berhasil Diambil');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::where('id_user', $id);
        if (!$user) {
            return $this->responseSuccess($user, 'User Gagal Ditemukan');
        }
        $user = $user->with('role')->first();
        $userArray = $user->toArray();
        $userArray['role'] = $user->role->name;
        return $this->responseSuccess($userArray, 'User Berhasil Ditemukan');
    }

    public function showAuth()
    {
        try {
            $userAuth = Auth::user();
            $user = User::where('id_user', $userAuth->id_user)->with('role')->first();
            $userArray = $user->toArray();
            $userArray['role'] = $user->role->name;
            return $this->responseSuccess($userArray, 'User Berhasil Ditemukan');
        } catch (Exception $e) {
            return $this->responseError('User Tidak Ditemukan');
        }
    }

    /**
     * Show user progress
     */

    public function showProgress()
    {
        $users = User::where('id_role', '!=', 1)->get();
        if (count($users) == 0) {
            return $this->responseError('User Tidak Ditemukan', 404);
        }
        $nilaiController = new NilaiController;
        foreach ($users as $key => $user) {
            // enrolment
            $enrolments = Enrollment::where('id_user', $user->id_user)->with(['kelas', 'materiHistory', 'quizHistory'])->get();
            $kelases = [];
            $progress = 0;
            $nilai = 0;
            $poin = 0;
            $count = 0;
            if (count($enrolments) != 0) {
                foreach ($enrolments as $key => $enrollment) {
                    $kelas = $enrollment->kelas;
                    $kelasName = $kelas->name;
                    $materiHistory = $enrollment->materiHistory;
                    $quizHistory = $enrollment->quizHistory;

                    foreach ($kelas->materi as $key => $materi) {
                        $firstMateriHistory = $materiHistory->where('id_materi', $materi->id_materi)->first();
                        $materi['status'] = $firstMateriHistory->status ?? EnumsStatus::STATUS_BELUM;
                        $materi['playback'] = $firstMateriHistory->playback ?? 00.00;
                        $kelas['max_poin'] += $materi->poin;
                    }
                    foreach ($kelas->quiz as $key => $quiz) {
                        $firstQuizHistory = $quizHistory->where('id_quiz', $quiz->id_quiz)->first();
                        $quiz['status'] = $firstQuizHistory->status ?? EnumsStatus::STATUS_BELUM;
                        $quiz['answer'] = $firstQuizHistory->option ?? null;
                    }

                    $progress += $nilaiController->getProgressKelas($kelas);
                    $nilai += $nilaiController->getNilaiKelas($kelas);
                    $poin += $nilaiController->getPoinKelas($kelas);
                    array_push($kelases, $kelasName);
                    $count += 1;
                }
                $progress = $progress == 0 ? 0 : ($progress / $count);
            }
            $user['kelas'] = $kelases;
            $user['progress'] = number_format($progress, 2, '.', '')  . '%';
            $user['nilai'] = $nilai;
            $user['poin'] = $poin;
        }
        return $this->responseSuccess($users, 'Progress User Berhasil ditampilkan');
    }

    /**
     * Get users progress by kelas
     */

    public function showProgressByKelas($id_kelas)
    {
        $enrollments = Enrollment::where('id_kelas', $id_kelas)->with(['user', 'kelas', 'materiHistory', 'quizHistory'])->get();
        if (count($enrollments) == 0) {
            return $this->responseError('progress Kelas Tidak Ditemukan', 404);
        }
        $nilaiController = new NilaiController;
        $data = [];
        foreach ($enrollments as $key => $enrollment) {
            $user = $enrollment->user;
            $kelas = $enrollment->kelas;
            $materiHistory = $enrollment->materiHistory;
            $quizHistory = $enrollment->quizHistory;

            foreach ($kelas->materi as $key => $materi) {
                $firstMateriHistory = $materiHistory->where('id_materi', $materi->id_materi)->first();
                $materi['status'] = $firstMateriHistory->status ?? EnumsStatus::STATUS_BELUM;
                $materi['playback'] = $firstMateriHistory->playback ?? 00.00;
                $kelas['max_poin'] += $materi->poin;
            }
            foreach ($kelas->quiz as $key => $quiz) {
                $firstQuizHistory = $quizHistory->where('id_quiz', $quiz->id_quiz)->first();
                $quiz['status'] = $firstQuizHistory->status ?? EnumsStatus::STATUS_BELUM;
                $quiz['answer'] = $firstQuizHistory->option ?? null;
            }

            $progress = $nilaiController->getProgressKelas($kelas);
            $nilai = $nilaiController->getNilaiKelas($kelas);
            $poin = $nilaiController->getPoinKelas($kelas);
            $data[$key]['user_name'] = $user->name;
            $data[$key]['kelas_name'] = $kelas->name;
            $data[$key]['progress'] = $progress . '%';
            $data[$key]['nilai'] = $nilai;
            $data[$key]['poin'] = $poin;
        }
        return $this->responseSuccess($data, 'Progress user per kelas Berhasil ditampilkan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user, string $id_user)
    {
        try {
            $update_email = false;
            // Define the validation rules
            $rules = [
                'name' => 'string|max:255',
                'email' => 'email|unique:users,email,' . $id_user . ',id_user',
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];

            // Validate the request data
            $validator = Validator::make($request->except(['_token']), $rules);

            if ($validator->fails()) {
                return $this->validatorError($validator->errors());
            }

            $user = $user->where('id_user', $id_user);

            if (is_null($user)) {
                return $this->responseError('User Tidak Ditemukan', 404);
            }
            // jika merubah name
            if ($request->name) {
                $user->name = $request->name;
            }

            // jika merubah image
            if ($request->file('image')) {
                if (!empty($user->image)) {
                    Storage::delete($user->image);
                }
                $image = $request->file('image')->store('images/user');
                $user->image = $image;
            }

            // jika merubah email
            if ($request->email) {
                $validator = Validator::make($request->all(), [
                    'host' => 'required'
                ]);
                if ($validator->fails()) {
                    return $this->validatorError($validator->errors());
                }
                $user->sendCustomEmailVerificationNotification($request->host);
                $user->email_verified_at = null;
                $update_email = true;
            }

            // jika merubah passwoord
            if ($request->password) {
                $validator = Validator::make($request->all(), [
                    'konfirmasi_password' => 'required|same:password',
                ]);
                if ($validator->fails()) {
                    return $this->validatorError($validator->errors());
                }
                $user->password = bcrypt($request->password);
            }

            $update = $user->save();
            if ($update_email) {
                return
                    $this->responseSuccess($update, 'User Berhasil Diupdate, silahkan verifikasi email anda', 201);
            }
            return $this->responseSuccess($update, 'User Berhasil Diupdate', 201);
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }

    public function updateAuth(Request $request, User $user)
    {
        try {
            $userAuth = Auth::user();
            $user = $user->where('id_user', $userAuth->id_user);
            $update_email = false;
            // Define the validation rules
            $rules = [
                'name' => 'string|max:255',
                'email' => 'email|unique:users,email,' . $user->id_user . ',id_user',
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];

            // Validate the request data
            $validator = Validator::make($request->except(['_token']), $rules);

            if ($validator->fails()) {
                return $this->validatorError($validator->errors());
            }

            if (is_null($user)) {
                return $this->responseError('User Tidak Ditemukan', 404);
            }
            // jika merubah name
            if ($request->name) {
                $user->name = $request->name;
            }

            // jika merubah email
            if ($request->email) {
                $validator = Validator::make($request->all(), [
                    'host' => 'required'
                ]);
                if ($validator->fails()) {
                    return $this->validatorError($validator->errors());
                }
                User::where('id_user', $user->id_user)->sendCustomEmailVerificationNotification($request->host);
                $user->email = $request->email;
                $user->email_verified_at = null;
                $update_email = true;
            }

            // jika merubah passwoord
            if ($request->password) {
                $validator = Validator::make($request->all(), [
                    'konfirmasi_password' => 'required|same:password',
                ]);
                if ($validator->fails()) {
                    return $this->validatorError($validator->errors());
                }
                $user->password = bcrypt($request->password);
            }

            $update = $user->save();
            if ($update_email) {
                return
                    $this->responseSuccess($update, 'User Berhasil Diupdate, silahkan verifikasi email anda');
            }
            return $this->responseSuccess($update, 'User Berhasil Diupdate', 201);
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }

    /**
     * Update image user.
     */

    public function updateImage(Request $request, User $user)
    {
        try {
            $rules = [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];

            // Validate the request data
            $validator = Validator::make($request->except(['_token']), $rules);

            if ($validator->fails()) {
                return $this->validatorError($validator->errors());
            }

            $userAuth = Auth::user();
            $user = $user->where('id_user', $userAuth->id_user)->first();
            if (is_null($user)) {
                return $this->responseError('User Tidak Ditemukan', 404);
            }
            // jika merubah image
            if (!empty($user->image)) {
                Storage::delete($user->image);
            }
            $image = $request->file('image')->store('images/user');
            $user->image = $image;
            $user->save();
            return $this->responseSuccess($image, 'User Photo Berhasil Diupdate', 201);
        } catch (Exception $e) {
            return $this->responseError($e->getMessage());
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, $id_user)
    {
        $hostPython = env("PYTHON_HOST");
        $user = $user->where('id_user', $id_user)->first();

        if (is_null($user)) {
            return $this->responseError('User Tidak Ditemukan');
        }

        if (!empty($user->image)) {
            Storage::delete($user->image);
        }
        // Delete the user
        // Inisialisasi Guzzle Client
        $client = new Client();

        // Data yang akan diirimkan dalam format JSON
        $data = [
            'faceId' => $user->faceId,
        ];

        $url = $hostPython . "/delete";

        // Konversi data ke JSON
        $json_data = json_encode($data);

        try {
            $client->delete($url, [
                'body' => $json_data,
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'verify' => false,
            ]);
        } catch (ClientException $e) {
            // Handle kesalahan di sini jika diperlukan
        }
        $user->delete();
        return $this->responseSuccess(true, 'User Berhasil Dihapus');
    }
}

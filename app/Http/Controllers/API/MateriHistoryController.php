<?php

namespace App\Http\Controllers\API;

use App\Models\MateriHistory;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MateriHistoryController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $history = MateriHistory::with(['materi'])->get();
        if ($history->isEmpty()) {
            return $this->responseSuccess(null, 'Data History Berhasil Diambil, data kosong');
        }
        return $this->responseSuccess($history, 'Data History Berhasil Diambil');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_enrollment' => 'required|exists:enrollments,id_enrollment',
            'id_materi' => 'required|exists:materi,id_materi',
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $user = Auth::user();
            $input = $validator->validated();
            $input['id_user'] = $user->id_user;
            $history = MateriHistory::create($input);
            return $this->responseSuccess($history, 'History Berhasil Ditambahkan', 201);
        } catch (Exception $e) {
            return $this->responseError("History Berhasil Ditambahkan");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MateriHistory $materiHistory)
    {
        $validator = Validator::make($request->all(), [
            'playback' => 'required_without_all:status',
            'status' => 'required_without_all:playback'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        $materiHistory->update($request->all());

        $this->responseSuccess($materiHistory, "Berhasil mengubah materi history");
    }
}

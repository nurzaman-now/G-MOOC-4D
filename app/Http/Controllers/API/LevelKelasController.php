<?php

namespace App\Http\Controllers\API;

use App\EnumsStatus;
use App\Models\Enrollment;
use App\Models\LevelKelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LevelKelasController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levelKelas = LevelKelas::all();
        return $this->responseSuccess($levelKelas, 'Level Kelas berhasil ditampilkan');
    }

    public function kelasByLevel()
    {
        $levelKelas = LevelKelas::with('kelas')->get();
        foreach ($levelKelas as $key => $level) {
            foreach ($level->kelas as $key => $value) {
                $enrollment = Enrollment::where([
                    'id_user' => auth()->user()->id_user,
                    'id_kelas' => $value->id_kelas
                ])->first();
                if ($enrollment == null) {
                    $value['status'] = EnumsStatus::STATUS_BELUM;
                } else {
                    $value['status'] = $enrollment->status;
                }
            }
        }
        return $this->responseSuccess($levelKelas, 'Kelas berhasil ditampilkan sesuai level');
    }

    public function kelasByLevelUser()
    {
        $levelKelas = LevelKelas::with('kelas')->get();
        foreach ($levelKelas as $key => $level) {
            $kelas = array_filter($levelKelas->kelas->toArray(), function ($kelas) {
                return count($kelas['materi']) != 0 && count($kelas['quiz']) != 0;
            });
            foreach ($kelas as $key => $value) {
                $enrollment = Enrollment::where([
                    'id_user' => auth()->user()->id_user,
                    'id_kelas' => $value['id_kelas']
                ])->first();
                if ($enrollment == null) {
                    $kelas[$key]['status'] = EnumsStatus::STATUS_BELUM;
                } else {
                    $kelas[$key]['status'] = $enrollment->status;
                }
            }
        }
        return $this->responseSuccess($levelKelas, 'Kelas berhasil ditampilkan sesuai level');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $input = $validator->validated();
            $levelKelas = LevelKelas::create($input);
            return $this->responseSuccess($levelKelas, 'Level Kelas Berhasil Ditambahkan', 201);
        } catch (\Exception $e) {
            return $this->responseError('Level Kelas Gagal Ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(LevelKelas $levelKelas, $id_level)
    {
        $levelKelas = LevelKelas::where('id_level', $id_level)->with('kelas')->first();
        foreach ($levelKelas->kelas as $key => $value) {
            $enrollment = Enrollment::where([
                'id_user' => auth()->user()->id_user,
                'id_kelas' => $value->id_kelas
            ])->first();
            if ($enrollment == null) {
                $value['status'] = EnumsStatus::STATUS_BELUM;
            } else {
                $value['status'] = $enrollment->status;
            }
        }
        return $this->responseSuccess($levelKelas, 'Level Kelas berhasil ditampilkan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LevelKelas $levelKelas, $id_level)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required_without_all:description',
            'description' => 'required_without_all:name'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        $level = $levelKelas->where('id_level', $id_level);
        if (!$level) {
            return $this->responseError('Level Kelas tidak ditemukan');
        }

        // Check if 'name' is present in the request before updating.
        if ($request->filled('name')) {
            $level->name = $request->input('name');
        }

        // Check if 'email' is present in the request before updating.
        if ($request->filled('description')) {
            $level->description = $request->input('description');
        }
        if ($level->save()) {
            return $this->responseSuccess($level, 'Level Kelas berhasil diupdate');
        }
        return $this->responseError('Level Kelas gagal diupdate');
    }
}

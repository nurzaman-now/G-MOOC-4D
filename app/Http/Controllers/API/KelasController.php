<?php

namespace App\Http\Controllers\API;

use App\EnumsStatus;
use App\Models\Enrollment;
use App\Models\Kelas;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KelasController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // mengambil semua kelas
        $kelas = Kelas::with(['level', 'materi', 'quiz'])->get();
        return $this->responseSuccess($kelas, 'Kelas berhasil ditampilkan');
    }

    public function all()
    {
        // mengambil semua kelas
        $kelas = Kelas::with(['level', 'materi', 'quiz'])->get();
        $kelas = array_filter($kelas->toArray(), function ($kelas) {
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
        return $this->responseSuccess($kelas, 'Kelas berhasil ditampilkan');
    }

    public function kelasByName($name)
    {
        $kelas = kelas::where('name', 'like', '%' . $name . '%')->with(['materi', 'quiz'])->get();
        $kelas = array_filter($kelas->toArray(), function ($kelas) {
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
        return $this->responseSuccess($kelas, 'Kelas berhasil ditampilkan');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:kelas,name|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'id_level' => 'required',
            'description' => 'required|max:100'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            // get image
            $imageInput = $request->file('image');
            $extension = $imageInput->getClientOriginalExtension(); // Get the original file extension
            $storedFilename = $request->name . '.' . $extension;
            $image = $imageInput->storeAs('images/kelas', $storedFilename);

            $store = $validator->validated();
            $store['image'] = $image;

            $kelas = Kelas::create($store);
            return $this->responseSuccess($kelas, 'Kelas berhasil dibuat', 201);
        } catch (Exception $e) {
            return $this->responseError('Kelas gagal dibuat | ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kelas $kelas, $id_kelas)
    {
        $kelas = $kelas->where('id_kelas', $id_kelas);
        if (is_null($kelas)) {
            return $this->responseSuccess(null, 'Kelas Tidak Ditemukan');
        }
        $data = $kelas->with(['level', 'materi', 'quiz'])->first();
        return $this->responseSuccess($data, 'Kelas Berhasil Ditemukan');
    }

    public function showByName(Kelas $kelas, $name)
    {
        $kelas = $kelas->where('name', $name);
        if (is_null($kelas)) {
            return $this->responseSuccess($kelas, 'Kelas Tidak Ditemukan');
        }
        $data = $kelas->with(['level', 'materi', 'quiz'])->first();
        return $this->responseSuccess($data, 'Kelas Berhasil Ditemukan');
    }

    /**
     * search the specified resource.
     */
    public function search(Request $request, Kelas $kelas)
    {
        $name = $request->query('name');
        $kelas = $kelas->where('name', 'like', '%' . $name . '%')->with(['level', 'materi', 'quiz'])->get();
        return $this->responseSuccess($kelas, 'Kelas Berhasil Ditemukan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id_kelas)
    {
        $kelas = Kelas::where('id_kelas', $id_kelas)->first();
        $rules = [
            'name' => 'required_without_all:description,id_level,image|unique:kelas,name,' . $id_kelas . ',id_kelas|string|max:255',
            'description' => 'required_without_all:name,id_level,image|max:100',
            'id_level' => 'required_without_all:name,description,image|exists:level_kelas,id_level',
            'image' => 'required_without_all:name,description,id_level|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];

        // Validate the request data
        $validator = Validator::make($request->except(['_token']), $rules);

        if (is_null($kelas)) {
            return $this->responseError('Kelas Tidak Ditemukan');
        }

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $image = $request->file('image');
            if ($image != null) {
                if (!empty($kelas->image)) {
                    Storage::delete($kelas->image);
                }

                $extension = $image->getClientOriginalExtension(); // Get the original file extension
                $storedFilename = $kelas->name . '.' . $extension;
                $kelas->image = $image->storeAs('images/kelas', $storedFilename);
            }

            $kelas->name = $request->name ?? $kelas->name;
            $kelas->description = $request->description ?? $kelas->description;
            $kelas->id_level = $request->id_level ?? $kelas->id_level;
            $kelas->save();

            return $this->responseSuccess($kelas, 'Kelas Berhasil Diupdate', 201);
        } catch (Exception $e) {
            return $this->responseError('Kelas Gagal Diupdate | ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelas $kelas, $id_kelas)
    {
        try {
            $kelas = $kelas->where('id_kelas', $id_kelas)->first();
            if (is_null($kelas)) {
                return $this->responseError('Kelas Tidak Ditemukan', 404);
            }

            Storage::delete($kelas->image);

            $delete = $kelas->delete();

            return $this->responseSuccess($delete, 'Kelas Berhasil Dihapus');
        } catch (Exception $e) {
            return $this->responseError('Kelas Gagal Dihapus | ' . $e->getMessage());
        }
    }
}

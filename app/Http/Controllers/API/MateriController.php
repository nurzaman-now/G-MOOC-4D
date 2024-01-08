<?php

namespace App\Http\Controllers\API;

use App\Models\Materi;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MateriController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // mengambil semua kelas
        $materi = Materi::all();
        return $this->responseSuccess($materi, 'Materi berhasil ditampilkan');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validator::extend('even', function ($attribute, $value, $parameters, $validator) {
            return $value % 2 == 0;
        });
        Validator::replacer('even', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, ':attribute harus berupa angka genap.');
        });
        $validator = Validator::make($request->all(), [
            'id_kelas' => 'required|exists:kelas,id_kelas',
            'name' => 'required',
            'materi' => 'required',
            'url' => 'required',
            'durasi' => 'required',
            'poin' => 'required|integer|even'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $input = $validator->validated();
            $input['durasi'] = $input['durasi'] * 60; // convert to milisecond [1 minute = 60 second]
            $materi = Materi::create($input);
            return $this->responseSuccess($materi, 'Materi Berhasil Ditambahkan', 201);
        } catch (Exception $e) {
            return $this->responseError('Materi Gagal Ditambahkan | ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Materi $materi, $id_materi)
    {
        $data = $materi->where('id_materi', $id_materi)->first();
        return $this->responseSuccess($data, 'Materi Berhasil Ditemukan');
    }

    /**
     * search materi by name
     */
    public function search(Request $request, Materi $materi)
    {
        $name = $request->query('name');
        $data = $materi->where('name', 'like', '%' . $name . '%')->get();
        return $this->responseSuccess($data, 'Materi Berhasil Ditemukan');
    }

    // by kelas
    public function showByKelas(Materi $materi, $id_kelas)
    {
        $data = $materi->where('id_kelas', $id_kelas)->get();
        return $this->responseSuccess($data, 'Materi Berhasil Ditemukan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Materi $materi, $id_materi)
    {
        Validator::extend('even', function ($attribute, $value, $parameters, $validator) {
            return $value % 2 == 0;
        });
        Validator::replacer('even', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, ':attribute harus berupa angka genap.');
        });
        $validator = Validator::make($request->all(), [
            'id_kelas' => 'required_without_all:name,id_kelas,materi,url|exists:kelas,id_kelas',
            'name' => 'required_without_all:id_kelas,materi,url',
            'materi' => 'required_without_all:id_kelas,name,url',
            'url' => 'required_without_all:id_kelas,name,materi',
            'durasi' => 'required_without_all:id_kelas,name,materi,url',
            'poin' => 'required_without_all:id_kelas,name,materi,url,durasi|integer|even'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $input = $request->all();
            if (isset($input['durasi'])) {
                $input['durasi'] = $input['durasi'] * 60000; // convert to milisecond [1 minute = 60000 milisecond
            }
            $materi = $materi->where('id_materi', $id_materi);
            if (is_null($materi)) {
                return $this->responseError('Materi Tidak Ditemukan');
            }
            $materi->update($input);
            return $this->responseSuccess($input, 'Materi Berhasil Diperbarui', 201);
        } catch (Exception $e) {
            return $this->responseError('Materi Gagal Diperbarui' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Materi $materi, $id_materi)
    {
        try {
            $materi = $materi->where('id_materi', $id_materi)->first();
            if (is_null($materi)) {
                return $this->responseError('Materi Tidak Ditemukan');
            }
            $materi->delete();
            return $this->responseSuccess(true, 'Materi Berhasil Dihapus');
        } catch (Exception $e) {
            return $this->responseError('Materi Gagal Dihapus');
        }
    }
}

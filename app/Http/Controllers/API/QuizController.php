<?php

namespace App\Http\Controllers\API;

use App\Models\Quiz;
use App\Models\QuizOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class QuizController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // ambil semua Quiz
        $quizzes = Quiz::with('options')->get();
        return $this->responseSuccess($quizzes, 'Berhasil mengambil Semua Data Quiz');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_kelas' => 'required|exists:kelas,id_kelas',
            'question' => 'required',
            'true_answer' => 'required',
            'option_A' => 'required',
            'option_B' => 'required',
            'option_C' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $quiz = Quiz::create([
                'id_kelas' => $request->id_kelas,
                'question' => $request->question,
                'true_answer' => $request->true_answer,
            ]);
            $options = array_filter($request->all(), function ($key) {
                return strpos($key, 'option') === 0;
            }, ARRAY_FILTER_USE_KEY);
            foreach ($options as  $key => $value) {
                $newKey = substr($key, 7);
                QuizOptions::create([
                    'id_quiz' => $quiz->id_quiz,
                    'kunci' => $newKey,
                    'option' => $value,
                ]);
            }
            return $this->responseSuccess($validator->validated(), 'Quiz berhasil ditambahkan', 201);
        } catch (\Exception $e) {
            //throw $th;
            return $this->responseError("gagal menambahkan quiz | " . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz, $id_quiz)
    {
        $quiz = $quiz->where('id_quiz', $id_quiz)->with('options')->first();
        return $this->responseSuccess($quiz, 'Berhasil mengambil data Quiz');
    }


    public function showByKelas(Quiz $quiz, $id_kelas)
    {
        $quiz = $quiz->where('id_kelas', $id_kelas)->with('options')->get();
        return $this->responseSuccess($quiz, 'Berhasil mengambil data Quiz');
    }

    /**
     * search quiz by name
     */
    public function search(Request $request, Quiz $quiz)
    {
        $name = $request->query('name');
        $quiz = $quiz->where('question', 'like', '%' . $name . '%')->with('options')->get();
        return $this->responseSuccess($quiz, 'Berhasil mengambil data Quiz');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz, $id_quiz)
    {
        $validator = Validator::make($request->all(), [
            'id_kelas' => 'required_without_all:question,true_answer,option_A,option_B,option_C|exists:kelas,id_kelas',
            'question' => 'required_without_all:id_kelas,true_answer',
            'true_answer' => 'required_without_all:id_kelas,question',
            'option_A' => 'required_without_all:id_kelas,question,true_answer,option_B,option_C',
            'option_B' => 'required_without_all:id_kelas,question,true_answer,option_A,option_C',
            'option_C' => 'required_without_all:id_kelas,question,true_answer,option_A,option_B',
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $quiz = $quiz->where('id_quiz', $id_quiz)->first();
            $options = array_filter($request->all(), function ($key) {
                return strpos($key, 'option') === 0;
            }, ARRAY_FILTER_USE_KEY);

            if (empty($quiz)) {
                return $this->responseError('Quiz tidak ditemukan');
            }
            $quiz->id_kelas = $request->id_kelas ?? $quiz->id_kelas;
            $quiz->question = $request->question ?? $quiz->question;
            $quiz->true_answer = $request->true_answer ?? $quiz->true_answer;
            $quiz->save();

            foreach ($options as $key => $value) {
                $newKey = substr($key, 7);
                QuizOptions::where([
                    'id_quiz' => $quiz->id_quiz,
                    'kunci' => $newKey,
                ])->update([
                    'option' => $value,
                ]);
            }
            return $this->responseSuccess($validator->validated(), 'Quiz berhasil diubah', 201);
        } catch (\Exception $e) {
            //throw $th;
            return $this->responseError("gagal mengubah quiz | " . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz, $id_quiz)
    {
        $quiz = $quiz->where('id_quiz', $id_quiz)->first();
        if (empty($quiz)) {
            return $this->responseError('Quiz tidak ditemukan');
        }
        try {
            $quiz->delete();
            return $this->responseSuccess(null, 'Quiz berhasil dihapus');
        } catch (\Exception $e) {
            //throw $th;
            return $this->responseError("gagal menghapus quiz | " . $e->getMessage());
        }
    }
}

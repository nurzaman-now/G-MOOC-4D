<?php

namespace App\Http\Controllers\API;

use App\EnumsStatus;
use App\Models\QuizHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class QuizHistoryController extends ResponseController
{

    /**
     * Store a newly created resource in storage.
     */
    public function storeOrUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_enrollment' => 'required|exists:enrollments,id_enrollment',
            'id_quiz' => 'required|exists:quiz,id_quiz',
            'id_answer' => 'required|exists:answers,id_answer',
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $user = Auth::user();
            $quizHistory = QuizHistory::where(['id_user' => $user->id_user])->first();
            if ($quizHistory) {
                $quizHistory->update($request->all());
                return $this->responseSuccess($quizHistory, 'Answer updated', 201);
            }
            $data = $request->all();
            $data['id_user'] = $user->id_user;
            $data['status'] = EnumsStatus::STATUS_SELESAI;
            $answer = QuizHistory::create($data);
            return $this->responseSuccess($answer, 'Answer created', 201);
        } catch (\Exception $e) {
            return $this->responseError("gagal membuat jawaban | " . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function showByUser(QuizHistory $quizHistory)
    {
        $user = Auth::user();
        $quizHistory = QuizHistory::where(['id_user' => $user->id_user])->with(['options'])->first();
        return $this->responseSuccess($quizHistory, 'Answer berhasil ditampilkan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, QuizHistory $quizHistory)
    {
        $validator = Validator::make($request->all(), [
            'id_option' => 'required_without_all:status',
            'status' => 'required_without_all:id_option'
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        $quizHistory->id_option = $request->id_option ?? $quizHistory->id_option;
        $quizHistory->status = $request->status ?? $quizHistory->status;
        $quizHistory->save();

        $this->responseSuccess($quizHistory, "Berhasil mengubah materi history");
    }
}

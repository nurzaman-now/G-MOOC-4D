<?php

namespace App\Http\Controllers\API;

use App\EnumsStatus;
use App\Models\Enrollment;
use App\Models\Kelas;
use App\Models\MateriHistory;
use App\Models\QuizHistory;
use App\Models\QuizOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EnrollmentController extends ResponseController
{
    public function show($name)
    {
        $kelas = Kelas::where('name', $name)->first();
        if ($kelas == null) {
            return $this->responseSuccess($kelas, 'Kelas tidak ditemukan');
        }
        $user = Auth::user();
        $enrollment = Enrollment::where([
            'id_user' => $user->id_user,
            'id_kelas' => $kelas->id_kelas
        ])->first();
        // jika enrollment tidak ada maka di buat otomatis
        if ($enrollment == null) {
            $enrollment = Enrollment::create([
                'id_user' => $user->id_user,
                'id_kelas' => $kelas->id_kelas
            ]);
            foreach ($kelas->materi as $key => $materi) {
                if ($key != 0) {
                    MateriHistory::create([
                        'id_enrollment' => $enrollment->id_enrollment,
                        'id_materi' => $materi->id_materi,
                    ]);
                    $materi['status'] = EnumsStatus::STATUS_BELUM;
                } else {
                    MateriHistory::create([
                        'id_enrollment' => $enrollment->id_enrollment,
                        'id_materi' => $kelas->materi[0]->id_materi,
                        'status' => EnumsStatus::STATUS_JALAN
                    ]);
                    $materi['status'] = EnumsStatus::STATUS_JALAN;
                }
            }
            foreach ($kelas->quiz as $key => $quiz) {
                QuizHistory::create([
                    'id_enrollment' => $enrollment->id_enrollment,
                    'id_quiz' => $quiz->id_quiz,
                ]);
                $quiz['status'] = EnumsStatus::STATUS_BELUM;
            }
        } else {
            // handle kekurangan history dalam kelas
            $selisihMateri = count($kelas->materi) - count($enrollment->materiHistory);
            $selisihQuiz = count($kelas->quiz) - count($enrollment->quizHistory);
            if ($selisihMateri > 0) {
                foreach ($kelas->materi as $key => $materi) {
                    if ($key >= count($enrollment->materiHistory)) {
                        MateriHistory::create([
                            'id_enrollment' => $enrollment->id_enrollment,
                            'id_materi' => $materi->id_materi,
                        ]);
                    }
                }
            }
            if ($selisihQuiz > 0) {
                foreach ($kelas->quiz as $key => $quiz) {
                    if ($key >= count($enrollment->quizHistory)) {
                        QuizHistory::create([
                            'id_enrollment' => $enrollment->id_enrollment,
                            'id_quiz' => $quiz->id_quiz,
                        ]);
                    }
                }
            }
        }

        // update status on history
        $enrollment = Enrollment::where([
            'id_user' => $user->id_user,
            'id_kelas' => $kelas->id_kelas
        ])->with(['kelas', 'materiHistory', 'quizHistory'])->first();
        $kelas = $enrollment->kelas;
        $materiHistory = $enrollment->materiHistory;
        $quizHistory = $enrollment->quizHistory;
        $materiHistoryFiltered = $materiHistory->filter(function ($value, $key) {
            return $value->status != EnumsStatus::STATUS_SELESAI;
        });
        $quizHistoryFiltered = $quizHistory->filter(function ($value, $key) {
            return $value->status != EnumsStatus::STATUS_SELESAI;
        });
        if ($materiHistoryFiltered->count() > 0) {
            MateriHistory::where([
                'id_materi_history' => $materiHistoryFiltered->first()->id_materi_history,
            ])->update(['status' => EnumsStatus::STATUS_JALAN]);
        }

        if ($materiHistoryFiltered->count() == 0) {
            if ($quizHistory->first()->status != EnumsStatus::STATUS_SELESAI) {
                QuizHistory::where([
                    'id_quiz_history' => $quizHistory->first()->id_quiz_history,
                ])->update(['status' => EnumsStatus::STATUS_JALAN]);
            }
            if ($quizHistoryFiltered->count() > 0) {
                QuizHistory::where([
                    'id_quiz_history' => $quizHistoryFiltered->first()->id_quiz_history,
                ])->update(['status' => EnumsStatus::STATUS_JALAN]);
            }
        }


        // get enrollment after update
        $enrollment = Enrollment::where([
            'id_user' => $user->id_user,
            'id_kelas' => $kelas->id_kelas
        ])->with(['kelas', 'materiHistory', 'quizHistory'])->first();
        $kelas = $enrollment->kelas;
        $materiHistory = $enrollment->materiHistory;
        $quizHistory = $enrollment->quizHistory;

        // edit materi
        foreach ($kelas->materi as $key => $materi) {
            $materi['id_materi_history'] = $materiHistory[$key]->id_materi_history;
            $materi['status'] = $materiHistory[$key]->status;
            $materi['playback'] = $materiHistory[$key]->playback;
        }

        // edit quiz
        foreach ($kelas->quiz as $key => $quiz) {
            $quiz['id_quiz_history'] = $quizHistory[$key]->id_quiz_history;
            $quiz['status'] = $quizHistory[$key]->status;
            $quiz['answer'] = $quizHistory[$key]->option;
        }

        // selesai semua atau belum
        $materiFiltered = $kelas->materi->filter(function ($value, $key) {
            return $value->status == EnumsStatus::STATUS_SELESAI;
        });
        $quizFiltered = $kelas->quiz->filter(function ($value, $key) {
            return $value->status == EnumsStatus::STATUS_SELESAI;
        });
        if (count($kelas->materi) == $materiFiltered->count() && count($kelas->quiz) == $quizFiltered->count()) {
            $enrollment->status = EnumsStatus::STATUS_SELESAI;
            $enrollment->save();
        }

        switch ($kelas->id_level) {
            case 1:
                $kelas->kkm = 60;
                break;
            case 2:
                $kelas->kkm = 70;
                break;
            case 3:
                $kelas->kkm = 80;
                break;
            default:
                $kelas->kkm = 60;
                break;
        }

        $nilaiController = new NilaiController();
        $poin =  $nilaiController->getPoinKelas($kelas);
        $nilai = $nilaiController->getNilaiKelas($kelas);
        $progress = $nilaiController->getProgressKelas($kelas);

        $data = [
            'id_enrollment' => $enrollment->id_enrollment,
            'kelas' => $kelas,
            'poin' => $poin,
            'nilai' => $nilai,
            'status' => $enrollment->status,
            'progress' => $progress,
            'quiz_count' => $enrollment->quiz_count,
        ];
        return $this->responseSuccess($data, 'Berhasil mengambil data');
    }

    public function updateMateri(Request $request, $id_materi_history)
    {
        $validator = Validator::make($request->all(), [
            'playback' => 'required',
            'status' => 'in:' . implode(',', EnumsStatus::ARRAY_STATUS)
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $materiHistory = MateriHistory::where('id_materi_history', $id_materi_history)->first();
            if ($materiHistory == null) {
                return $this->responseError("History Gagal Diperbarui, enrollment tidak ada");
            }
            $materiHistory->playback = $request->playback ?? $materiHistory->playback;
            $materiHistory->status = $request->status ?? $materiHistory->status;
            $materiHistory->save();
            return $this->responseSuccess(true, 'History Berhasil Diperbarui', 201);
        } catch (\Exception $e) {
            return $this->responseError("History Gagal Diperbarui " . $e->getMessage());
        }
    }
    public function updateQuiz(Request $request, $id_quiz_history)
    {
        $validator = Validator::make($request->all(), [
            'id_option' => 'required',
            'status' => 'in:' . implode(',', EnumsStatus::ARRAY_STATUS)
        ]);

        if ($validator->fails()) {
            return $this->validatorError($validator->errors());
        }

        try {
            $quizHistory = QuizHistory::where('id_quiz_history', $id_quiz_history)->with('quiz')->first();
            if ($quizHistory == null) {
                return $this->responseError("History Gagal Diperbarui, enrollment tidak ada");
            }
            $quizHistory->id_option = $request->id_option ?? $quizHistory->id_option;
            $quizHistory->status = $request->status ?? $quizHistory->status;
            $quizHistory->save();
            // return answer is true or false
            $quiz = $quizHistory->quiz;
            $option = QuizOptions::where('id_option', $quizHistory->id_option)->first();
            $option_true = QuizOptions::where('kunci', $quiz->true_answer)->first();
            $answer = $option->kunci == $quiz->true_answer ? true : false;

            return $this->responseSuccess(compact(['answer', 'option_true']), 'History Berhasil Diperbarui', 201);
        } catch (\Exception $e) {
            return $this->responseError("History Gagal Diperbarui " . $e->getMessage());
        }
    }

    public function rekap($id_enrollment)
    {
        $enrollment = Enrollment::where('id_enrollment', $id_enrollment)->with(['kelas', 'quizHistory'])->first();
        $kelas = $enrollment->kelas;
        $quizHistory = $enrollment->quizHistory;

        $quizSelesai = $quizHistory->filter(function ($value, $key) {
            return $value->status == EnumsStatus::STATUS_SELESAI;
        });

        if ($quizSelesai->count() == 0) {
            return $this->responseError('Quiz belum selesai');
        }

        $jawaban = [];
        foreach ($kelas->quiz as $key => $quiz) {
            $firstQuizHistory = $quizHistory->where('id_quiz', $quiz->id_quiz)->first();
            $quiz['answer'] = $firstQuizHistory->option ?? null;
            array_push($jawaban, $firstQuizHistory->option);
        }

        $nilaiController = new NilaiController();
        $nilai = $nilaiController->getNilaiKelas($kelas);

        switch ($kelas->id_level) {
            case 1:
                $kelas->kkm = 60;
                break;
            case 2:
                $kelas->kkm = 70;
                break;
            case 3:
                $kelas->kkm = 80;
                break;
            default:
                $kelas->kkm = 60;
                break;
        }

        if ($nilai < $kelas->kkm) {
            $quizHistory = QuizHistory::where('id_enrollment', $id_enrollment);
            $quizHistory->update(['status' => EnumsStatus::STATUS_BELUM]);
            $quizHistory->first()->update(['status' => EnumsStatus::STATUS_JALAN]);
        }

        $enrollment->quiz_count += 1;
        $enrollment->save();

        $data = [
            'id_enrollment' => $enrollment->id_enrollment,
            'jawaban' => $jawaban,
            'nilai' => $nilai,
            'ulang' => $nilai < $kelas->kkm ? true : false,
        ];

        return $this->responseSuccess($data, 'Berhasil mengambil data');
    }

    public function destroy($id_enrollment)
    {
        $delete = Enrollment::where('id_enrollment', $id_enrollment)->delete();
        if ($delete) {
            MateriHistory::where('id_enrollment', $id_enrollment)->delete();
            QuizHistory::where('id_enrollment', $id_enrollment)->delete();
            $this->responseSuccess($delete, 'Enrollment berhasil di hapus');
        }
        $this->responseError('Enrollment gagal di hapus');
    }
}

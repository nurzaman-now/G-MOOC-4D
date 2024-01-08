<?php

namespace App\Http\Controllers\API;

use App\EnumsStatus;
use App\Models\Enrollment;
use App\Models\MateriHistory;
use App\Models\Kelas;
use App\Models\User;
use App\Models\QuizHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NilaiController extends ResponseController
{

    function getLeaderboard()
    {
        try {
            $data = [];
            $enrollments = Enrollment::with(['user', 'kelas', 'materihistory'])->get();
            foreach ($enrollments as $key => $enrollment) {
                $kelas = $enrollment->kelas;
                $materi = $kelas->materi;
                $materiHistory = $enrollment->materihistory;
                foreach ($materi as $keyy => $value) {
                    isset($materiHistory[$keyy]) ? $value['playback'] = $materiHistory[$keyy]->playback : $value['playback'] = 0;
                }
                $enrollment['poin'] = $this->getPoinKelas($kelas);
                array_push($data, [
                    'poin' => 0,
                    'user' => $enrollment->user
                ]);
                $data[$key]['poin'] += $enrollment['poin'];
            }
            $mergedData = [];

            foreach ($data as $item) {
                $id_user = $item["user"]["id_user"];
                if (!isset($mergedData[$id_user])) {
                    $mergedData[$id_user] = [
                        "count" => 0,
                        "poin" => 0,
                        "user" => $item["user"],
                    ];
                }
                $mergedData[$id_user]["count"]++;
                $mergedData[$id_user]["poin"] += $item["poin"];
            }

            // Convert the merged data back to an indexed array
            // $enrollmentMarged = array_values($mergedData);

            // sort by poin
            usort($mergedData, function ($a, $b) {
                return $b['poin'] - $a['poin'];
            });

            // Add the 'rank' field based on the sorted order
            $rank = 1;
            foreach ($mergedData as &$item) {
                $item['ranking'] = $rank++;
            }
            return $mergedData;
        } catch (\Exception $e) {
            return null;
        }
    }

    public function leaderboard()
    {
        $user = Auth::user();
        $enrollmentMarged = $this->getLeaderboard();
        $enrollments = [];
        if ($enrollmentMarged != null) {
            foreach ($enrollmentMarged as $key => $value) {
                $value["active"] = $value["user"]["id_user"] == $user->id_user ? true : false;
                array_push($enrollments, $value);
            }

            if (isset($enrollments)) {
                $currentUser = array_filter($enrollments, function ($enroll) use ($user) {
                    return $enroll['user']['id_user'] == $user->id_user;
                });
            } else {
                $currentUser = [];
            }

            $data = [
                'ranking' => array_slice($enrollments, 0, 10),
                'user' => count($currentUser) != 0 ? array_values($currentUser)[0] : [],
            ];
            return $this->responseSuccess($data, 'Berhasil menampilkan data');
        } else {
            return $this->responseSuccess([], 'Data kosong');
        }
    }

    public function search(Request $request)
    {
        $name = $request->query('name');
        $enrollmentMarged = $this->getLeaderboard();

        if (isset($enrollmentMarged)) {
            $response = array_filter($enrollmentMarged, function ($enroll) use ($name) {
                $enrollName = strtolower($enroll['user']['name']);
                $name = strtolower($name);
                return str_contains($enrollName, $name);
            });
        } else {
            $response = [];
        }
        return $this->responseSuccess($response, 'Berhasil menampilkan data');
    }

    public function getByKelas($id_kelas)
    {
        $users = User::where('id_role', 2)->get();
        $data = [];

        foreach ($users as $key => $user) {
            $enrollment = Enrollment::where(['id_kelas' => $id_kelas, 'id_user' => $user->id_user])->with(['kelas', 'user', 'materihistory', 'quizHistory'])->first();

            if ($enrollment != null) {
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

                $nilai = $this->getNilaiKelas($kelas);
                $progress = $this->getProgressKelas($kelas) . '%';
                $poin = $this->getPoinKelas($kelas);

                $temp = [
                    'name' => $user->name,
                    'kelas' => $kelas->name,
                    'progress' => $progress,
                    'nilai' => $nilai,
                    'poin' => $poin,
                ];
                array_push($data, $temp);
            }
        }

        return $this->responseSuccess($data, 'Berhasil mengambil data nilai perkelas');
    }

    public function show()
    {
        $user = Auth::user();
        $enrollments = Enrollment::where('id_user', $user->id_user)->with(['kelas', 'materihistory', 'quizHistory'])->get();
        $kelasProgress = [];
        $kelasSelesai = [];
        $poin = 0;

        foreach ($enrollments as $key => $enroll) {
            $kelas = $enroll->kelas;
            $materiHistory = $enroll->materiHistory;
            $quizHistory = $enroll->quizHistory;
            $materiHistoryFiltered = $materiHistory->filter(function ($value, $key) {
                return $value->status == EnumsStatus::STATUS_SELESAI;
            });
            $quizHistoryFiltered = $quizHistory->filter(function ($value, $key) {
                return $value->status == EnumsStatus::STATUS_SELESAI;
            });

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
            if ($materiHistoryFiltered->count() == count($kelas->materi) && $quizHistoryFiltered->count() == count($kelas->quiz)) {
                array_push($kelasSelesai, $kelas);
            } else {
                array_push($kelasProgress, $kelas);
            }
        }

        foreach ($kelasProgress as $key => $prog) {
            $prog['nilai'] = $this->getNilaiKelas($prog);
            $prog['poin'] = $this->getPoinKelas($prog);
            $prog['progress'] = $this->getProgressKelas($prog) . '%';
        }
        foreach ($kelasSelesai as $key => $selesai) {
            $selesai['nilai'] = $this->getNilaiKelas($selesai);
            $selesai['poin'] = $this->getPoinKelas($selesai);
            $selesai['progress'] = $this->getProgressKelas($selesai) . '%';
        }

        $kelasProgressPoin = $this->getPoin($kelasProgress);
        $kelasSelesaiPoin = $this->getPoin($kelasSelesai);
        $rataProgress = $this->getProgress($kelasProgress);
        $rataSelesai = $this->getProgress($kelasSelesai);
        $nilaiProgress = $this->getNilai($kelasProgress);
        $nilaiSelesai = $this->getNilai($kelasSelesai);

        $poin = $kelasProgressPoin + $kelasSelesaiPoin;
        $rataKelas = $rataProgress + $rataSelesai;
        $rata = $rataKelas == 0 ? $rataKelas : $rataKelas / 2;
        $nilaiKelas = $nilaiProgress + $nilaiSelesai;
        $nilai = $nilaiKelas == 0 ? $nilaiKelas : $nilaiKelas / 2;

        $data = [
            'kelas_progress' => $kelasProgress,
            'kelas_selesai' => $kelasSelesai,
            'jumlah_selesai' => count($kelasSelesai),
            'rata_progress' => round($rata, 2) . '%',
            'total_poin' => $poin,
            'nilai' => round($nilai),
        ];

        return $this->responseSuccess($data, 'berhasil menampilkan rapor');
    }

    function getPoin($useKelas)
    {
        $poin = 0;

        foreach ($useKelas as $key => $kelas) {
            $poin += $this->getPoinKelas($kelas);
        }
        return $poin;
    }

    public function getPoinKelas($kelas)
    {
        $poin = 0;
        $materi = $kelas->materi;
        foreach ($materi as $key => $value) {
            $persentase = $value->playback / $value->durasi;
            $poin += round($persentase) * $value->poin;
        }
        return $poin;
    }

    function getProgress($useKelas)
    {
        $progress = 0;
        foreach ($useKelas as $key => $kelas) {
            $progress += $this->getProgressKelas($kelas);
        }

        return $progress == 0 ? 0 : $progress / count($useKelas);
    }

    public function getProgressKelas($kelas)
    {
        $materi = $kelas->materi;
        $quiz = $kelas->quiz;
        $countMateri = count($materi);
        $countQuiz = count($quiz);
        $countItem = $countMateri + $countQuiz;
        $progressKelas = 0;
        foreach ($materi as $key => $value) {
            $progressKelas += $value->status == EnumsStatus::STATUS_SELESAI ? 1 : 0;
        }
        foreach ($quiz as $key => $value) {
            $progressKelas += $value->status == EnumsStatus::STATUS_SELESAI ? 1 : 0;
        }
        $kelas['progress'] = round(($progressKelas / $countItem) * 100) . '%';
        return round(($progressKelas / $countItem) * 100);
    }

    function getNilai($useKelas)
    {
        $nilai = 0;
        foreach ($useKelas as $key => $kelas) {
            $nilai += $this->getNilaiKelas($kelas);
        }
        return $nilai == 0 ? 0 : $nilai / count($useKelas);
    }

    public function getNilaiKelas($kelas)
    {
        $nilai = 0;
        $quiz = $kelas->quiz;
        foreach ($quiz as $key => $value) {
            if (isset($value->answer)) {
                $persentase = $value->answer->kunci == $value->true_answer ? 1 : 0;
                $nilai += $persentase * 100;
            }
        }
        return $nilai == 0 ? 0 : round($nilai / count($quiz));
    }
}

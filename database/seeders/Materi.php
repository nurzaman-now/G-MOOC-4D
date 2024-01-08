<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Materi extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [
            [
                'id_kelas' => 1,
                'name' => 'Dasar Pemrograman dengan Javascript : INTRO',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=RUTV_5m4VeI&ab_channel=WebProgrammingUNPAS',
                'durasi' => 5000.0,
                'poin' => 20,
            ],
            [
                'id_kelas' => 1,
                'name' => 'Dasar Pemrograman dengan Javascript : Variable',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=Ncrlg9kTC6U&ab_channel=WebProgrammingUNPAS',
                'durasi' => 6000.0,
                'poin' => 30,
            ],
            [
                'id_kelas' => 1,
                'name' => 'Dasar Pemrograman dengan Javascript : Tipe Data',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=dugL0oYx0w0&ab_channel=WebProgrammingUNPAS',
                'durasi' => 7000.0,
                'poin' => 40,
            ],
            [
                'id_kelas' => 2,
                'name' => 'Dasar Pemrograman dengan PHP : INTRO',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=l1W2OwV5rgY&list=PLFIM0718LjIUqXfmEIBE3-uzERZPh3vp6&ab_channel=WebProgrammingUNPAS',
                'durasi' => 5500.0,
                'poin' => 30,
            ],
            [
                'id_kelas' => 2,
                'name' => 'Dasar Pemrograman dengan PHP : Variable',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=q3NVC5JxgVI&list=PLFIM0718LjIUqXfmEIBE3-uzERZPh3vp6&index=2&ab_channel=WebProgrammingUNPAS',
                'durasi' => 6500.0,
                'poin' => 40,
            ],
            [
                'id_kelas' => 2,
                'name' => 'Dasar Pemrograman dengan PHP : Tipe Data',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=o8oLQVYlpqw&list=PLFIM0718LjIUqXfmEIBE3-uzERZPh3vp6&index=3&ab_channel=WebProgrammingUNPAS',
                'durasi' => 7500.0,
                'poin' => 50,
            ],
            [
                'id_kelas' => 3,
                'name' => 'Dasar Pemrograman dengan Python : INTRO',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&ab_channel=WebProgrammingUNPAS',
                'durasi' => 6000.0,
                'poin' => 30,
            ],
            [
                'id_kelas' => 3,
                'name' => 'Dasar Pemrograman dengan Python : Variable',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=2&ab_channel=WebProgrammingUNPAS',
                'durasi' => 7000.0,
                'poin' => 40,
            ],
            [
                'id_kelas' => 3,
                'name' => 'Dasar Pemrograman dengan Python : Tipe Data',
                'materi' => 'Di seri ini kita akan mempelajari mengenai konsep dasar pemrograman, istilah2 yang ada dalam dunia pemrograman, cara menulis dan mengeksekusi program, dll.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=3&ab_channel=WebProgrammingUNPAS',
                'durasi' => 8000.0,
                'poin' => 50,
            ],
            [
                'id_kelas' => 4,
                'name' => 'Dasar Pemrograman dengan HTML : INTRO',
                'materi' => 'HTML adalah singkatan dari Hypertext Markup Language. HTML adalah bahasa markup standar untuk dokumen yang dirancang untuk ditampilkan di peramban web.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&ab_channel=WebProgrammingUNPAS',
                'durasi' => 6000.0,
                'poin' => 30,
            ],
            [
                'id_kelas' => 4,
                'name' => 'Dasar Pemrograman dengan HTML : Variable',
                'materi' => 'HTML adalah singkatan dari Hypertext Markup Language. HTML adalah bahasa markup standar untuk dokumen yang dirancang untuk ditampilkan di peramban web.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=2&ab_channel=WebProgrammingUNPAS',
                'durasi' => 7000.0,
                'poin' => 40,
            ],
            [
                'id_kelas' => 4,
                'name' => 'Dasar Pemrograman dengan HTML : Tipe Data',
                'materi' => 'HTML adalah singkatan dari Hypertext Markup Language. HTML adalah bahasa markup standar untuk dokumen yang dirancang untuk ditampilkan di peramban web.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=3&ab_channel=WebProgrammingUNPAS',
                'durasi' => 8000.0,
                'poin' => 50,
            ],
            [
                'id_kelas' => 5,
                'name' => 'Dasar Pemrograman dengan CSS : INTRO',
                'materi' => 'CSS adalah singkatan dari Cascading Style Sheets. CSS adalah bahasa gaya yang digunakan untuk mendefinisikan tata letak dari dokumen HTML.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&ab_channel=WebProgrammingUNPAS',
                'durasi' => 6000.0,
                'poin' => 30,
            ],
            [
                'id_kelas' => 5,
                'name' => 'Dasar Pemrograman dengan CSS : Variable',
                'materi' => 'CSS adalah singkatan dari Cascading Style Sheets. CSS adalah bahasa gaya yang digunakan untuk mendefinisikan tata letak dari dokumen HTML.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=2&ab_channel=WebProgrammingUNPAS',
                'durasi' => 7000.0,
                'poin' => 40,
            ],
            [
                'id_kelas' => 5,
                'name' => 'Dasar Pemrograman dengan CSS : Tipe Data',
                'materi' => 'CSS adalah singkatan dari Cascading Style Sheets. CSS adalah bahasa gaya yang digunakan untuk mendefinisikan tata letak dari dokumen HTML.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=3&ab_channel=WebProgrammingUNPAS',
                'durasi' => 8000.0,
                'poin' => 50,
            ],
            // java
            [
                'id_kelas' => 6,
                'name' => 'Dasar Pemrograman dengan Java : INTRO',
                'materi' => 'Java adalah bahasa pemrograman yang dapat dijalankan di berbagai komputer termasuk telepon genggam.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&ab_channel=WebProgrammingUNPAS',
                'durasi' => 6000.0,
                'poin' => 30,
            ],
            [
                'id_kelas' => 6,
                'name' => 'Dasar Pemrograman dengan Java : Variable',
                'materi' => 'Java adalah bahasa pemrograman yang dapat dijalankan di berbagai komputer termasuk telepon genggam.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=2&ab_channel=WebProgrammingUNPAS',
                'durasi' => 7000.0,
                'poin' => 40,
            ],
            [
                'id_kelas' => 6,
                'name' => 'Dasar Pemrograman dengan Java : Tipe Data',
                'materi' => 'Java adalah bahasa pemrograman yang dapat dijalankan di berbagai komputer termasuk telepon genggam.',
                'url' => 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa&index=3&ab_channel=WebProgrammingUNPAS',
                'durasi' => 8000.0,
                'poin' => 50,
            ]
        ];

        foreach ($rules as $rule) {
            \App\Models\Materi::create($rule);
        }
    }
}

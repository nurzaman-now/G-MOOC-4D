<?php

use App\EnumsStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('materi_histories', function (Blueprint $table) {
            $table->id('id_materi_history');
            $table->foreignId('id_enrollment')->references('id_enrollment')
                ->on('enrollments')
                ->onDelete('cascade');
            $table->foreignId('id_materi')->references('id_materi')
                ->on('materi')
                ->onDelete('cascade');
            $table->float('playback', 32, 2)->default(00.00);
            $table->enum('status', EnumsStatus::ARRAY_STATUS)->default(EnumsStatus::STATUS_BELUM);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materi_histories');
    }
};

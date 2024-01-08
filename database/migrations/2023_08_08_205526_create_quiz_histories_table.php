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
        Schema::create('quiz_histories', function (Blueprint $table) {
            $table->id('id_quiz_history');
            $table->foreignId('id_enrollment')->references('id_enrollment')
                ->on('enrollments')
                ->onDelete('cascade');
            $table->foreignId('id_quiz')->references('id_quiz')->on('quiz')->onDelete('cascade');
            $table->foreignId('id_option')->nullable()
                ->references('id_option')
                ->on('quiz_options')
                ->onDelete('cascade');
            $table->enum('status', EnumsStatus::ARRAY_STATUS)->default(EnumsStatus::STATUS_BELUM);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_histories');
    }
};

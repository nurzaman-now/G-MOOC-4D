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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id('id_enrollment');
            $table->foreignId('id_user')->references('id_user')
                ->on('users')
                ->onDelete('cascade');
            $table->foreignId('id_kelas')->references('id_kelas')
                ->on('kelas')
                ->onDelete('cascade');
            $table->enum('status', EnumsStatus::ARRAY_STATUS)->default(EnumsStatus::STATUS_JALAN);
            $table->integer('quiz_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};

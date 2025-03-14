<?php

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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('company_id')->after('id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('branch_id')->after('company_id')->nullable()->constrained()->cascadeOnDelete();
            $table->boolean('isActive')->default(true)->after('email');
            $table->string('role')->default('admin')->after('isActive');
            $table->string('phone')->nullable()->after('role');
            $table->tinyText('gender')->nullable()->after('phone');
            $table->string('address')->nullable()->after('gender');
            $table->string('avatar')->nullable()->after('address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('company_id');
            $table->dropConstrainedForeignId('branch_id');
            $table->dropColumn(['isActive', 'role', 'phone', 'address', 'avatar', 'gender']);
        });
    }
};

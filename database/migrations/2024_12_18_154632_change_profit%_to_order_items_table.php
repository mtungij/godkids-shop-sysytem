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
        Schema::table('order_items', function (Blueprint $table) {
            // avoid division by zero
            $table->decimal('profit_percentage')->virtualAs("
                CASE
                  WHEN qty = 0 THEN 0
                  ELSE (profit / buy_total) * 100
                END
            ")->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->decimal('profit_percentage')->default(0)->change();
        });
    }
};

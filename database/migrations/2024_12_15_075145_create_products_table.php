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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('unit')->nullable();
            $table->integer('buy_price');
            $table->integer('sell_price');
            $table->decimal('stock')->default(0);
            $table->integer('stock_alert')->default(0);
            $table->string('unique_id')->default('0');
            $table->date('expired_date')->nullable();
            $table->integer('whole_price')->default(0);
            $table->decimal('whole_stock')->default(0);
            $table->integer('capital')->virtualAs('buy_price * stock');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

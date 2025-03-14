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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->restrictOnDelete();
            $table->decimal('qty');
            $table->decimal('pending_qty')->default(0);
            $table->integer('price');
            $table->integer('buy_price');
            $table->integer('discount')->default(0);
            $table->integer('total')->virtualAs('qty * price - discount');
            $table->integer('buy_total')->virtualAs('qty * buy_price');
            $table->integer('profit')->virtualAs('total - buy_total');
            $table->decimal('profit_percentage')->virtualAs('(profit / buy_total) * 100');
            $table->decimal('balance_pending_qty')->virtualAs('qty - pending_qty');
            $table->integer('balance_pending_total')->virtualAs('balance_pending_qty * price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};

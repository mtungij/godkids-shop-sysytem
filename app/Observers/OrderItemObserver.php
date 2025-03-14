<?php

namespace App\Observers;

use App\Enums\Enums\OrderStatusesEnum;
use App\Models\Account;
use App\Models\OrderItem;

class OrderItemObserver
{
    /**
     * Handle the OrderItem "created" event.
     */
    public function created(OrderItem $orderItem): void
    {
        // decrement the stock of the product
        $orderItem->product->decrement('stock', $orderItem->qty);
    }

    /**
     * Handle the OrderItem "deleted" event.
     */
    public function deleted(OrderItem $orderItem): void
    {
        // increment the stock of the product
        $orderItem->product->increment('stock', $orderItem->qty);

        // alter account balance
        $account = Account::firstOrCreate([
            'branch_id' => auth()->user()->branch_id,
            'payment_method_id' => $orderItem->order->payment_method_id,
          ]);

          $amount = $orderItem->order->status === OrderStatusesEnum::PENDING ? 0 : $orderItem->total;

          $account->decrement('amount', $amount);

          $account->accountTransactions()->create([
            'user_id' => auth()->id(),
            'type' => 'withdraw',
            'description' => "Deleted orderItem #{$orderItem->product->name}~order{$orderItem->order->invoice_no}",
            'amount' => $amount,
            'balance' => $account->amount,
          ]);
    }

    /**
     * Handle the OrderItem "restored" event.
     */
    public function restored(OrderItem $orderItem): void
    {
        // decrement the stock of the product
        $orderItem->product->decrement('stock', $orderItem->qty);
    }

    /**
     * Handle the OrderItem "force deleted" event.
     */
    public function forceDeleted(OrderItem $orderItem): void
    {
        // increment the stock of the product
        $orderItem->product->increment('stock', $orderItem->qty);
    }
}

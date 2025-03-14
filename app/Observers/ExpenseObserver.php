<?php

namespace App\Observers;

use App\Models\Account;
use App\Models\Expense;

class ExpenseObserver
{
    /**
     * Handle the Expense "created" event.
     */
    public function created(Expense $expense): void
    {
        // alter account balance
        $account = Account::firstOrCreate([
            'branch_id' => auth()->user()->branch_id,
            'payment_method_id' => $expense->payment_method_id,
          ]);

          $account->decrement('amount', $expense->cost);

          $account->accountTransactions()->create([
            'user_id' => auth()->id(),
            'type' => 'withdraw',
            'description' => "Expense #$expense->item",
            'amount' => $expense->cost,
            'balance' => $account->amount,
          ]);
    }

    /**
     * Handle the Expense "updated" event.
     */
    public function updated(Expense $expense): void
    {
        //
    }

    /**
     * Handle the Expense "deleted" event.
     */
    public function deleted(Expense $expense): void
    {
        // alter account balance
        $account = Account::firstOrCreate([
            'branch_id' => auth()->user()->branch_id,
            'payment_method_id' => $expense->payment_method_id,
          ]);

          $account->increment('amount', $expense->cost);

          $account->accountTransactions()->create([
            'user_id' => auth()->id(),
            'type' => 'deposit',
            'description' => "Deleted Expense #$expense->item",
            'amount' => $expense->cost,
            'balance' => $account->amount,
          ]);
    }

    /**
     * Handle the Expense "restored" event.
     */
    public function restored(Expense $expense): void
    {
        //
    }

    /**
     * Handle the Expense "force deleted" event.
     */
    public function forceDeleted(Expense $expense): void
    {
        //
    }
}

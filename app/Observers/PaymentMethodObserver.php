<?php

namespace App\Observers;

use App\Models\Account;
use App\Models\Branch;
use App\Models\PaymentMethod;

class PaymentMethodObserver
{
    /**
     * Handle the PaymentMethod "created" event.
     *
     * @param  \App\Models\PaymentMethod  $paymentMethod
     * @return void
     */
    public function created(PaymentMethod $paymentMethod)
    {
       $branches = Branch::where('company_id', $paymentMethod->company_id)->get();
       foreach ($branches as $branch) {
            $account = Account::create([
                'branch_id' => $branch->id,
                'payment_method_id' => $paymentMethod->id,
                'amount' => 0,
            ]);
        }
    }
}

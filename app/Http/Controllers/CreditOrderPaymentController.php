<?php

namespace App\Http\Controllers;

use App\Enums\Enums\OrderStatusesEnum;
use App\Models\Account;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreditOrderPaymentController extends Controller
{
    
    public function store(Request $request, Order $creditOrder)
    {
        $validated = $request->validate([
            'payment_method_id' => 'required',
            'amount' => 'required|numeric|max:9999999999.9|min:0',
        ]);

        $validated['branch_id'] = auth()->user()->branch_id;
        $validated['user_id'] = auth()->id();

        DB::transaction(function () use ($creditOrder, $validated) {
            $credit = Order::where('id', $creditOrder->id)
                               ->withSum('orderItems', 'total')
                               ->withSum('creditOrderPayments', 'amount')
                               ->first();
    
            $debt = $credit->order_items_sum_total - $credit->credit_order_payments_sum_amount;
    
            if ($debt >= $validated['amount']) {
                $creditOrder->creditOrderPayments()->create($validated);
    
                if($debt == $validated['amount']) {
                    $creditOrder->update(['status' => OrderStatusesEnum::PAID]);
                }
            } else {
                $validated['amount'] = $debt;
                $creditOrder->creditOrderPayments()->create($validated);
    
                $creditOrder->update(['status' => OrderStatusesEnum::PAID]);
            }
    
            
            $account = Account::firstOrCreate([
                'branch_id' => auth()->user()->branch_id,
                'payment_method_id' => $validated['payment_method_id'],
              ]);
    
              $account->increment('amount', $validated['amount']);
    
              $account->accountTransactions()->create([
                'user_id' => auth()->id(),
                'type' => 'deposit',
                'description' => "Received credit order #$creditOrder->invoice_no",
                'amount' => $validated['amount'],
                'balance' => $account->amount,
              ]);
        }, 5);

        return back();
    }
}

<?php

namespace App\Http\Controllers;

use App\Enums\Enums\OrderStatusesEnum;
use App\Models\Account;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $search = request()->search ?? null;
        $branch_id = request()->branch_id ?? null;

        return Inertia::render('Orders/Index', [
            'orders' => Inertia::defer(fn () => 
                            Order::with(['branch', 'user', 'paymentMethod', 'customer'])
                                ->withSum('orderItems', 'total')
                                // ->where('status', OrderStatusesEnum::CREDIT)
                                ->where(function ($query) use ($search) {
                                    $query->where('invoice_no', 'LIKE', "%$search%")
                                        ->orWhereHas('customer', function ($query) use ($search) {
                                            $query->where('name', 'LIKE', "%$search%");
                                        });
                                })
                                ->when($branch_id, fn ($query) => $query->where('branch_id', $branch_id))
                                ->when(auth()->user()->role !== 'admin' || auth()->user()->role !== 'manager',
                                 fn ($query) => $query->where('user_id', auth()->id()))
                                ->latest()
                                ->paginate(50)
            )
        ]);
    }


    public function creditOrders(): Response
    {
        $search = request()->search ?? null;
        $branch_id = request()->branch_id ?? null;

        return Inertia::render('CreditOrders/Index', [
            'orders' => Inertia::defer(fn () => 
                                    Order::with(['branch', 'user', 'paymentMethod', 'customer'])
                                             ->withSum('orderItems', 'total')
                                             ->withSum('creditOrderPayments', 'amount')
                                             ->where('status', OrderStatusesEnum::CREDIT)
                                             ->where(function ($query) use ($search) {
                                                 $query->where('invoice_no', 'LIKE', "%$search%")
                                                       ->orWhereHas('customer', function ($query) use ($search) {
                                                           $query->where('name', 'LIKE', "%$search%");
                                                       });
                                             })
                                             ->when($branch_id, fn ($query) => $query->where('branch_id', $branch_id))
                                             ->when(auth()->user()->role !== 'admin' || auth()->user()->role !== 'manager',
                                      fn ($query) => $query->where('user_id', auth()->id()))
                                             ->latest()
                                             ->paginate(20)
                       ),
            'paymentMethods' => Inertia::defer(fn () => \App\Models\PaymentMethod::get())
        ]);
    }


    public function pendingOrders(): Response
    {
        $search = request()->search ?? null;
        $branch_id = request()->branch_id ?? null;

        return Inertia::render('PendingOrders/Index', [
            'orders' => Inertia::defer(fn () =>
                                    Order::with(['branch', 'user', 'paymentMethod', 'customer', 'orderItems.product'])
                                             ->withSum('orderItems', 'total_pending_qty')
                                             ->where('status', OrderStatusesEnum::PENDING)
                                             ->where(function ($query) use ($search) {
                                                 $query->where('invoice_no', 'LIKE', "%$search%")
                                                       ->orWhereHas('customer', function ($query) use ($search) {
                                                           $query->where('name', 'LIKE', "%$search%");
                                                       });
                                             })
                                             ->when($branch_id, fn ($query) => $query->where('branch_id', $branch_id))
                                             ->when(auth()->user()->role !== 'admin' || auth()->user()->role !== 'manager',
                                 fn ($query) => $query->where('user_id', auth()->id()))
                                             ->latest()
                                             ->paginate(20)
                       ),
        ]);
    }


    public function editPendingOrder(Order $order): Response
    {
        return Inertia::render('PendingOrders/Edit', [
            'order' => Order::where('status', 'pending')->with(['branch', 'user', 'paymentMethod', 'customer', 'orderItems.product'])->first(),
            'paymentMethods' => Inertia::defer(fn () => \App\Models\PaymentMethod::get())
        ]);
    }


    public function confirmAllPendingItems(Order $order): RedirectResponse
    {
        $order->orderItems()->each(function ($item) {
            $item->increment('qty', $item->pending_qty);
        });

       $order->update([
           'status' => OrderStatusesEnum::PAID
       ]);

        return redirect()->back();
    }


    public function confirmPendingOrder(Order $order): RedirectResponse
    {
        $order->update([
            'status' => OrderStatusesEnum::PAID
        ]);

        return redirect()->route('orders.pendingOrders');
    }


    public function cancelPendingOrder(Order $order): RedirectResponse
    {
        $order->orderItems()->each(function ($item) {
            $item->product->increment('stock', $item->pending_qty);
        });

        $order->update([
            'status' => OrderStatusesEnum::CANCELLED
        ]);

        return redirect()->route('orders.pendingOrders');
    }


    public function destroy(Order $order): RedirectResponse
    {
        $items = $order->orderItems()->get();

        foreach ($items as $item) {
            $item->product->increment('stock', $item->qty);
        }

        // alter account balance
        $account = Account::firstOrCreate([
            'branch_id' => auth()->user()->branch_id,
            'payment_method_id' => $order->payment_method_id,
          ]);


          $account->decrement('amount', $order->orderItems()->sum('total'));

          $account->accountTransactions()->create([
            'user_id' => auth()->id(),
            'type' => 'withdraw',
            'description' => "Deleted order #{$order->invoice_no}",
            'amount' => $order->orderItems()->sum('total'),
            'balance' => $account->amount,
          ]);

        $order->delete();

        return back();
    }

}

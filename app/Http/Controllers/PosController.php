<?php

namespace App\Http\Controllers;

use App\Enums\Enums\OrderStatusesEnum;
use App\Models\Account;
use App\Models\Customer;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Valorin\Random\Random;

class PosController extends Controller
{
    public function index(): Response
    {
        $search = request()->search ?? null;

        return Inertia::render('Pos/Index', [
            'products' => Inertia::defer(fn () => 
                                Product::where('name', 'LIKE', "%$search%")
                                            ->where('branch_id',auth()->user()->branch_id)
                                            ->latest()
                                            ->get(),
                         ),
            'paymentMethods' => Inertia::defer(fn () => PaymentMethod::get()),
            'customers' => Inertia::defer(fn () => Customer::get(['id', 'name'])),
            'orderDate' => now()->format('Y-m-d H:m'),
            'invoice_no' => Inertia::defer(fn () =>  Random::number(0000000, 100000000))
        ]);
    }


    public function sell(Request $request): RedirectResponse
    {
        $request->validate([
            'customer_id' => 'nullable',
            'customer_name' => 'nullable|string|max:50',
            'customer_contact' => 'nullable|string|max:50',
            'customer_address' => 'nullable|string|max:100',
            'payment_method_id' => 'required',
            'order_date' => 'nullable',
            'invoice_no' => 'required',
            'status' => 'required',
            'order_items' => 'required|array',
            'order_items.*.product_id' => 'required',
            'order_items.*.qty' => 'required',
            'order_items.*.price' => 'required',
            'order_items.*.buy_price' => 'required',
            'order_items.*.discount' => 'nullable',
        ]);

        DB::transaction(function () use($request) {
            $customer = null;

            if ($request->customer_id || $request->customer_name) {
                $customer = Customer::firstOrCreate(
                    ['id' => $request->customer_id],
                    [
                        'branch_id' => auth()->user()->branch_id,
                        'name' => $request->customer_name,
                        'contact' => $request?->customer_contact,
                        'address' => $request?->customer_address,
                    ]
                );
            }
    
            $order = Order::create([
                'payment_method_id' => $request->payment_method_id,
                'user_id' => auth()->id(),
                'customer_id' => $customer?->id,
                'branch_id' => auth()->user()->branch_id,
                'order_date' => $request->order_date,
                'invoice_no' => $request->invoice_no,
                'status' => $request->status,
            ]);

    
            foreach ($request->order_items as $item) {
                $product = Product::find($item['product_id']);

                if($product->stock < $item['qty']) {
                    return redirect()->back()->with('error', "$product->name has only $product->qty left but you tried to sell " . $item['qty']);
                }

                switch ($order->status) {
                    case OrderStatusesEnum::PENDING->value:
                        $order->orderItems()->create([
                            'product_id' => $item['product_id'],
                            'qty' => 0,
                            'pending_qty' => $item['qty'],
                            'price' => $item['price'],
                            'buy_price' => $item['buy_price'],
                        ]);
                        break;
                    default:
                        $order->orderItems()->create([
                            'product_id' => $item['product_id'],
                            'qty' => $item['qty'],
                            'price' => $item['price'],
                            'buy_price' => $item['buy_price'],
                        ]);
                        break;
                }
                // $product->decrement('stock', $item['qty']); // moved to OrderItemObserver
            }

            $account = Account::firstOrCreate([
                'branch_id' => auth()->user()->branch_id,
                'payment_method_id' => $request->payment_method_id,
              ]);

              $account->increment('amount', $request->status == 'paid' ? $order->orderItems()->sum('total'): 0);
    
              $account->accountTransactions()->create([
                'user_id' => auth()->id(),
                'type' => 'deposit',
                'description' => "Order #$order->invoice_no",
                'amount' => $request->status == 'paid' ? $order->orderItems()->sum('total') : 0,
                'balance' => $account->amount,
              ]);
        }, 5);


       return redirect()->route('pos.invoice', auth()->user()->orders()->latest()->first()->id);
    }


    public function invoice(Order $order): Response
    {
        return Inertia::render('Pos/Invoice', [
            'order' => fn () =>
                        Order::with(['orderItems.product', 'customer', 'paymentMethod', 'user'])
                                ->withSum('orderItems', 'total')
                                ->find($order->id),
        ]);
    }
}

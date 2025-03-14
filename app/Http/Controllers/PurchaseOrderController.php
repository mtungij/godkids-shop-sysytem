<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\Scopes\BranchScope;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Valorin\Random\Random;

class PurchaseOrderController extends Controller
{
    public function index(): Response
    {
        $search = request('search') ?? null;

        return Inertia::render('PurchaseOrders/Index', [
            'purchaseOrders' => Inertia::defer(function () use($search) {
                return PurchaseOrder::with(['supplier', 'paymentMethod', 'user'])
                                        ->where('reference', 'like', "%{$search}%")
                                        ->withSum('items', 'total_buy_price')
                                        ->latest()
                                        ->paginate(50);
            }),
        ]);
    }


    public function create(): Response
    {
        $branch_id = request()->branch_id ?? null;
        return Inertia::render('PurchaseOrders/Create', [
            'branches' => Inertia::defer(function () {
                return auth()->user()->company->branches;
            }),
            'suppliers' => Inertia::defer(function () {
                return auth()->user()->company->suppliers;
            }),
            'paymentMethods' => Inertia::defer(function () {
                return auth()->user()->company->paymentMethods;
            }),
            'reference' => Random::letters(8),
            'products' => Inertia::defer(function () use($branch_id) {
                return Product::withoutGlobalScope(BranchScope::class)->where('branch_id', $branch_id)->get();
            }),
        ]);
    }


    public function show(PurchaseOrder $purchase): Response
    {
        return Inertia::render('PurchaseOrders/Show', [
            'purchaseOrder' =>  PurchaseOrder::with(['supplier', 'paymentMethod', 'branch', 'items.product'])
                                            ->withSum('items', 'total_buy_price')
                                            ->find($purchase->id),
        ]);
    }


    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'supplier_id' => 'nullable',
            'payment_method_id' => 'required',
            'reference' => 'required',
            'purchase_date' => 'required',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required',
            'items.*.qty' => 'required|max:99999999|numeric|min:0',
            'items.*.buy_price' => 'required|max:999999999|numeric|min:0',
            'items.*.sell_price' => 'required|max:999999999|numeric|min:0',
        ]);

        DB::transaction(function () use($request) {
            $purchaseOrder = PurchaseOrder::create(['company_id' => auth()->user()->company_id, 
            'user_id' => auth()->id(),
            ...$request->only('user_id', 'supplier_id', 'payment_method_id', 'reference')]);

            foreach ($request->items as $item) {
                $item = $purchaseOrder->items()->create([
                    'product_id' => $item['product_id'],
                    'stock' => $item['qty'],
                    'buy_price' => $item['buy_price'],
                    'sell_price' => $item['sell_price'],
                ]);
                $product = Product::find($item->product_id);

                $product->increment('stock', $item->stock);
                $product->update([
                    'buy_price' => $item->buy_price,
                    'sell_price' => $item->sell_price,
                ]);
            }

            // alter account balance
          $account = Account::firstOrCreate([
            'branch_id' => auth()->user()->branch_id,
            'payment_method_id' => $purchaseOrder->payment_method_id,
          ]);

          $account->decrement('amount', $purchaseOrder->items->sum('total_buy_price'));

          $account->accountTransactions()->create([
            'user_id' => auth()->id(),
            'type' => 'withdraw',
            'description' => "PurchaseOrder #$purchaseOrder->reference",
            'amount' => $purchaseOrder->items->sum('total_buy_price'),
            'balance' => $account->amount,
          ]);
        }, 5);

        return redirect()->route('purchases.index');
    }
}

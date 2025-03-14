<?php

namespace App\Http\Controllers;

use App\Models\CreditOrderPayment;
use App\Models\Product;
use App\Models\Expense;
use App\Models\OrderItem;
use Carbon\Carbon;
use Flowframe\Trend\Trend;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        if (auth()->user()->role !== 'admin')
              return redirect()->route('my-sales');

        [$startDate, $endDate] = $this->getDates();

        $capital = Product::sum('capital');

        $totalStock = Product::sum('stock');
        
        $emptystock = Product::where('stock', '<=', 0)->paginate(10);

        $trendingProducts = Product::select('products.id', 'products.name', DB::raw('SUM(order_items.qty) as total_sold'))
                                        ->join('order_items', 'products.id', '=', 'order_items.product_id')
                                        ->groupBy('products.id', 'products.name')
                                        ->orderBy('total_sold')
                                        ->take(10)
                                        ->get();

        $expenseTotal = Expense::whereBetween('created_at', [$startDate, $endDate])
                                   ->where('branch_id', auth()->user()->branch_id)
                                    ->sum('cost');

                                    
        $salesTotal = OrderItem::whereBetween('created_at', [$startDate, $endDate])
                                    ->whereRelation('order', 'status', 'paid')
                                    ->whereRelation('order', 'branch_id', auth()->user()->branch_id)
                                    ->sum('total');

        $profitTotal = OrderItem::whereBetween('created_at', [$startDate, $endDate])
                                    ->whereRelation('order', 'status', 'paid')
                                    ->whereRelation('order', 'branch_id', auth()->user()->branch_id)
                                    ->sum('profit');

        $creditPaymentsTotal = CreditOrderPayment::whereBetween('created_at', [$startDate, $endDate])
                                    ->where('branch_id', auth()->user()->branch_id)
                                    ->sum('amount');

        // total sales per each month
        $monthlySales = Trend::query(OrderItem::query()->whereRelation('order', 'status', 'paid')
                                  ->whereRelation('order', 'branch_id', auth()->user()->branch_id))
                                  ->between(
                                        start: now()->startOfYear(),
                                        end: now()->endOfYear(),
                                    )
                                    ->perMonth()
                                    ->sum('total');

        $monthlyProfit = Trend::query(OrderItem::query()->whereRelation('order', 'status', 'paid')
                                                  ->whereRelation('order', 'branch_id', auth()->user()->branch_id))
                                         ->between(
                                            start: now()->startOfYear(),
                                            end: now()->endOfYear(),
                                        )
                                        ->perMonth()
                                        ->sum('profit');

        $monthlyExpenses = Trend::query(Expense::query()->where('branch_id', auth()->user()->branch_id))
                                    ->between(
                                            start: now()->startOfYear(),
                                            end: now()->endOfYear(),
                                        )
                                        ->perMonth()
                                        ->sum('cost');
        
        // dd($monthlySales);

                       
        
        return Inertia::render('Dashboard', [
            'startDate' => $startDate->format('Y-m-d'),
            'endDate' => $endDate->format('Y-m-d'),
            'monthlySales' =>  Inertia::defer(fn () => $monthlySales),
            'monthlyProfit' => Inertia::defer(fn () => $monthlyProfit),
            'monthlyExpenses' => Inertia::defer(fn () => $monthlyExpenses),
            'emptyStocks' => Inertia::defer(fn () => $emptystock),
            'trendingProducts' => Inertia::defer(fn () => $trendingProducts),
            'stocksData' => Inertia::defer(fn () => [
                [
                   'title' => 'Capital',
                   'amount' => $capital,
                   'net' => "______",
                   'isPositive' => true,
               ],
                [
                   'title' => 'Total stock available',
                   'amount' => $totalStock,
                   'net' => "______",
                   'isPositive' => true,
               ]
            ]),
            'statsData' => Inertia::defer(fn () => [
                 [
                    'title' => 'Expenses',
                    'amount' => $expenseTotal,
                    'net' => "______",
                    'isPositive' => false,
                ],
                 [
                    'title' => 'Sales',
                    'amount' => $salesTotal,
                    'net' => "NET. " . number_format($salesTotal - $expenseTotal),
                    'isPositive' => true,
                ],
                 [
                    'title' => 'Profit',
                    'amount' => $profitTotal,
                    'net' => "NET. " . number_format($profitTotal - $expenseTotal),
                    'isPositive' => true,
                ],
                 [
                    'title' => 'Credit Collections',
                    'amount' => $creditPaymentsTotal,
                    'net' => "______",
                    'isPositive' => true,
                ]
            ]),
        ]);
    }



    protected function getDates(): array
    {
        $validated = request()->validate([
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date|after_or_equal:startDate',
        ]);

        $startDate = Carbon::parse($validated['startDate'] ?? now()->startOfMonth())->startOfDay();
        $endDate = Carbon::parse($validated['endDate'] ?? now()->endOfMonth())->endOfDay();

        return [$startDate, $endDate];
    }


}

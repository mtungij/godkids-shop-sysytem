<?php

namespace App\Http\Controllers;

use App\Enums\Enums\OrderStatusesEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MySalesController extends Controller
{
    public function index(): Response
    {
        $revenue = auth()->user()->orderItems()->whereRelation('order', 'status', OrderStatusesEnum::PAID)
                                ->whereDate('orders.created_at', now()->endOfDay())
                                ->sum('total');

        $expenses = auth()->user()->expenses()->whereDate('expenses.created_at', now()->endOfDay())->sum('cost');

        $creditSales = auth()->user()->orderItems()->whereRelation('order', 'status', OrderStatusesEnum::CREDIT)->sum('total');

        $creditCollections = auth()->user()->creditOrderPayments()->whereDate('credit_order_payments.created_at', now()->endOfDay())->sum('amount');

        return Inertia::render('Mysales', [
            'sales' => Inertia::defer(fn () => [
                'revenue' => $revenue,
                'expenses' => $expenses,
                'creditSales' => $creditSales,
                'creditCollections' => $creditCollections,
            ]),
            'items' => Inertia::defer(fn () =>
                           auth()->user()
                                 ->orderItems()
                                 ->whereDate('order_items.created_at', now())
                                 ->with(['order' => ['customer', 'paymentMethod'], 'product'])
                                 ->latest()
                                 ->paginate(50)
            ),
            
        ]);
    }
}

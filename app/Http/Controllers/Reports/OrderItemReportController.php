<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderItemReportController extends Controller
{
    public function index(): Response
    {
        $startDate = request()->startDate ?? now()->startOfMonth();
        $endDate = request()->endDate ?? now()->endOfMonth();
        $search = request()->search ?? null;

        return Inertia::render('Reports/OrderItemReport',[
            'startDate' => request()->startDate ?? now()->startOfMonth(),
            'endDate' => request()->endDate ?? now()->endOfMonth(),
            'orderItems' => Inertia::defer(function () use($startDate, $endDate, $search) {
                    return OrderItem::where(function ($query) use ($search) {
                            $query->whereRelation('order', 'invoice_no', "LIKE", "%{$search}%")
                                  ->orWhereRelation('order.customer', 'name', "LIKE", "%{$search}%")
                                  ->orWhereRelation('order', 'created_at', "LIKE", "%{$search}%");
                        })
                        // ->whereBetween('created_at', [$startDate, $endDate])
                        ->whereHas('order.branch', function ($query) {
                            $query->where('company_id', auth()->user()->company_id);
                        })
                        ->with([
                            'order' => [
                                'customer',
                                'branch',
                                'user',
                                'paymentMethod'
                            ],
                            'product'
                        ])
                        ->limit(1000)
                        ->get();
            }),
        ]);
    }
}

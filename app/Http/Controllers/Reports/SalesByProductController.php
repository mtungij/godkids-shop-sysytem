<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;
use Maatwebsite\Excel\Facades\Excel;

class SalesByProductController extends Controller
{
    public function index(): Response
    {
        [$startDate, $endDate] = $this->getDates();

        $sales = $this->getQuery($startDate, $endDate);

        return Inertia::render('Reports/SalesByProduct', [
            'products' => Inertia::defer(fn () => $sales),
            'startDate' => $startDate->format('Y-m-d'),
            'endDate' => $endDate->format('Y-m-d'),
        ]);
    }

    public function exportExcel()
    {
        [$startDate, $endDate] = $this->getDates();

        $sales = $this->getQuery($startDate, $endDate);

        $fileName = 'sales_by_product_' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new class($sales) implements \Maatwebsite\Excel\Concerns\FromView {
            public $sales;

            public function __construct($sales)
            {
                $this->sales = $sales;
            }

            public function view(): \Illuminate\Contracts\View\View
            {
                return View::make('reports.sales_by_product_excel', ['sales' => $this->sales]);
            }
        }, $fileName);
    }

    public function exportPdf()
    {
        [$startDate, $endDate] = $this->getDates();

        $sales = $this->getQuery($startDate, $endDate);

        $pdf = Pdf::loadView('reports.sales_by_product_pdf', [
            'sales' => $sales,
            'startDate' => $startDate->format('Y-m-d'),
            'endDate' => $endDate->format('Y-m-d'),
        ]);

        return $pdf->download('sales_by_product_' . now()->format('Ymd_His') . '.pdf');
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

    protected function getQuery(Carbon $startDate, Carbon $endDate)
    {
        return Product::has('orderItems')
            ->where('branch_id', auth()->user()->branch_id)
            ->whereRelation('orderItems', 'created_at', '>=', $startDate)
            ->whereRelation('orderItems', 'created_at', '<=', $endDate)
            ->withSum('orderItems', 'total')
            ->withSum('orderItems', 'profit')
            ->withSum('orderItems', 'qty')
            ->orderBy('order_items_sum_total', 'desc')
            ->get(['id', 'name']);
    }
}

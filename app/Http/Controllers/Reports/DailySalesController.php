<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\OrderItem;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\View;

class DailySalesController extends Controller
{
    public function index(Request $request): Response
    {
        [$startDate, $endDate] = $this->getDates();

        $dailySales = $this->getQuery($startDate, $endDate);

        return Inertia::render('Reports/DailySales', [
            'dailySales' => Inertia::defer(fn () => $dailySales),
            'startDate' => $startDate->format('Y-m-d'),
            'endDate' => $endDate->format('Y-m-d'),
        ]);
    }

    public function exportExcel()
    {
        [$startDate, $endDate] = $this->getDates();

        $dailySales = $this->getQuery($startDate, $endDate);

        $fileName = 'daily_sales_' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new class($dailySales) implements \Maatwebsite\Excel\Concerns\FromView {
            public $dailySales;

            public function __construct($dailySales)
            {
                $this->dailySales = $dailySales;
            }

            public function view(): \Illuminate\Contracts\View\View
            {
                return View::make('reports.daily_sales_excel', ['dailySales' => $this->dailySales]);
            }
        }, $fileName);
    }

    public function exportPdf()
    {
        [$startDate, $endDate] = $this->getDates();

        $dailySales = $this->getQuery($startDate, $endDate);

        $pdf = Pdf::loadView('reports.daily_sales_pdf', [
            'dailySales' => $dailySales,
            'startDate' => $startDate->format('Y-m-d'),
            'endDate' => $endDate->format('Y-m-d'),
        ]);

        return $pdf->download('daily_sales_' . now()->format('Ymd_His') . '.pdf');
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
        return OrderItem::whereBetween('created_at', [$startDate, $endDate])
            ->whereRelation('order', 'branch_id', auth()->user()->branch_id)
            ->selectRaw('DATE_FORMAT(created_at, "%d-%m-%Y") as day')
            ->selectRaw('SUM(total) as sales')
            ->selectRaw('SUM(profit) as profit')
            ->groupByRaw('DATE_FORMAT(created_at, "%d-%m-%Y")')
            ->orderByRaw('DATE_FORMAT(created_at, "%d-%m-%Y") asc')
            ->get();
    }
}

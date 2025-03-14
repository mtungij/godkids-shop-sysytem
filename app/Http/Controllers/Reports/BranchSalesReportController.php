<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\View;

class BranchSalesReportController extends Controller
{
    public function index(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        return Inertia::render('Reports/BranchSalesReport', [
            'branches' => Inertia::defer(fn () => $reportData),
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        $fileName = 'branch_sales_report_' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new class($reportData) implements \Maatwebsite\Excel\Concerns\FromView {
            public $reportData;

            public function __construct($reportData)
            {
                $this->reportData = $reportData;
            }

            public function view(): \Illuminate\Contracts\View\View
            {
                return View::make('reports.branch_sales_excel', [
                    'branches' => $this->reportData
                ]);
            }
        }, $fileName);
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        $pdf = Pdf::loadView('pdf.branch-sales-report', [
            'branches' => $reportData,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);

        return $pdf->download('branch_sales_report.pdf');
    }

    protected function getDates(Request $request): array
    {
        $startDate = Carbon::parse($request->startDate ?? now()->startOfMonth())->startOfDay();
        $endDate = Carbon::parse($request->endDate ?? now()->endOfMonth())->endOfDay();

        return [$startDate, $endDate];
    }

    protected function getQuery(Carbon $startDate, Carbon $endDate)
    {
        return Branch::where('company_id', auth()->user()->company_id)
            ->withSum(['expenses as expenses' => function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('expenses.created_at', [$startDate, $endDate]);
            }], 'cost')
            ->withSum(['orderItems as sales' => function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('order_items.created_at', [$startDate, $endDate])
                    ->whereRelation('order', 'status', 'paid');
            }], 'total')
            ->withSum(['orderItems as profit' => function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('order_items.created_at', [$startDate, $endDate])
                    ->whereRelation('order', 'status', 'paid');
            }], 'profit')
            ->get();
    }
}

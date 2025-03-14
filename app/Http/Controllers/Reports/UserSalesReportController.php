<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\View;

class UserSalesReportController extends Controller
{
    public function index(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        return Inertia::render('Reports/UserSalesReport', [
            'users' => Inertia::defer(fn () => $reportData),
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);
        $reportData = $this->getQuery($startDate, $endDate);

        $fileName = 'user_sales_' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new class($reportData) implements \Maatwebsite\Excel\Concerns\FromView {
            public $reportData;

            public function __construct($reportData)
            {
                $this->reportData = $reportData;
            }

            public function view(): \Illuminate\Contracts\View\View
            {
                return View::make('reports.user_sales_excel', [
                    'users' => $this->reportData
                ]);
            }
        }, $fileName);
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);
        $reportData = $this->getQuery($startDate, $endDate);

        $pdf = Pdf::loadView('pdf.user-sales-report', [
            'users' => $reportData,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);

        return $pdf->download('user_sales_report.pdf');
    }

    protected function getDates(Request $request): array
    {
        $startDate = Carbon::parse($request->startDate ?? now()->startOfMonth())->startOfDay();
        $endDate = Carbon::parse($request->endDate ?? now()->endOfMonth())->endOfDay();

        return [$startDate, $endDate];
    }

    protected function getQuery(Carbon $startDate, Carbon $endDate)
    {
        return User::whereHas('company', function ($query) {
                $query->where('id', auth()->user()->company_id);
            })
            ->withSum(['orderItems as sales' => function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('order_items.created_at', [$startDate, $endDate])
                             ->whereRelation('order', 'status', 'paid');
            }], 'total')
            ->withSum(['orderItems as profit' => function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('order_items.created_at', [$startDate, $endDate])
                             ->whereRelation('order', 'status', 'paid');
            }], 'profit')
            ->withSum(['expenses as expenses' => function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('expenses.created_at', [$startDate, $endDate]);
            }], 'cost')
            ->withSum(['creditOrderPayments as credit_collections' => function ($query) use ($startDate, $endDate) {
                return $query->whereBetween('credit_order_payments.created_at', [$startDate, $endDate]);
            }], 'amount')
            ->get();
    }
}

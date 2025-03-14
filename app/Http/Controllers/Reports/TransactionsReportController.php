<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\AccountTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\View;

class TransactionsReportController extends Controller
{
    public function index(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        return Inertia::render('Reports/TransactionsReport', [
            'transactions' => Inertia::defer(fn () => $reportData),
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        $fileName = 'transactions_report_' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new class($reportData) implements \Maatwebsite\Excel\Concerns\FromView {
            public $reportData;

            public function __construct($reportData)
            {
                $this->reportData = $reportData;
            }

            public function view(): \Illuminate\Contracts\View\View
            {
                return View::make('reports.transactions_excel', [
                    'transactions' => $this->reportData
                ]);
            }
        }, $fileName);
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        $fileName = 'transactions_report' . date('Ymd_Hmi') . '.pdf';

        $pdf = Pdf::loadView('pdf.transactions-report', [
            'transactions' => $reportData,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);

        return $pdf->download($fileName);
    }

    protected function getDates(Request $request): array
    {
        $startDate = Carbon::parse($request->startDate ?? now()->startOfMonth())->startOfDay();
        $endDate = Carbon::parse($request->endDate ?? now()->endOfMonth())->endOfDay();

        return [$startDate, $endDate];
    }

    protected function getQuery(Carbon $startDate, Carbon $endDate)
    {
        return AccountTransaction::with(['user', 'account' => ['branch', 'paymentMethod']])
                                    ->whereBetween('created_at', [$startDate, $endDate])
                                    ->whereRelation('user', 'company_id', auth()->user()->company_id)
                                    ->orderBy('user_id')
                                    ->limit(1000)
                                    ->get();
    }
}

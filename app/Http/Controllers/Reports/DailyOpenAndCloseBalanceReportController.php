<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\AccountTransaction;
use Illuminate\Http\Request;
use App\Models\Account;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class DailyOpenAndCloseBalanceReportController extends Controller
{
    public function index(Request $request)
    {
        $reportData = $this->getQuery();

        return Inertia::render('Reports/BalanceSheet', [
            'accounts' => Inertia::defer(fn () => $reportData),
        ]);
    }

    public function exportExcel(Request $request)
    {
        $reportData = $this->getQuery();

        $fileName = 'balance_sheet_report_' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new class($reportData) implements \Maatwebsite\Excel\Concerns\FromView {
            public $reportData;

            public function __construct($reportData)
            {
                $this->reportData = $reportData;
            }

            public function view(): \Illuminate\Contracts\View\View
            {
                return View::make('reports.balance_sheet_excel', [
                    'accounts' => $this->reportData
                ]);
            }
        }, $fileName);
    }

    public function exportPdf(Request $request)
    {
        $reportData = $this->getQuery();

        $fileName = "balance_sheet_report". date('Ymd_Hmi') .".pdf";

        $pdf = Pdf::loadView('pdf.balance-sheet-report', [
            'accounts' => $reportData,
        ]);

        return $pdf->download($fileName);
    }

    protected function getQuery()
    {
        return AccountTransaction::with(['branch', 'paymentMethod'])
                    ->selectRaw('balance')
                    ->selectRaw('DATE_FORMAT(created_at, "%d-%m-%Y") as day')
                    ->groupByRaw('DATE_FORMAT(created_at, "%d-%m-%Y")')
                    ->orderByRaw('DATE_FORMAT(created_at, "%d-%m-%Y") asc')
                    ->get();
    }
}

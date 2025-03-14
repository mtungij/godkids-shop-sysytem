<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Branch;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class BalanceSheetReportController extends Controller
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
                    'branches' => $this->reportData
                ]);
            }
        }, $fileName);
    }

    public function exportPdf(Request $request)
    {
        $reportData = $this->getQuery();

        $fileName = "balance_sheet_report". date('Ymd_Hmi') .".pdf";

        $pdf = Pdf::loadView('pdf.balance-sheet-report', [
            'branches' => $reportData,
        ]);

        return $pdf->download($fileName);
    }

    protected function getQuery()
    {
        return Branch::with(['accounts.paymentMethod'])
                         ->orderBy('id')
                         ->get();
    }
}

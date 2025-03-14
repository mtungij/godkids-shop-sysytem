<?php

namespace App\Http\Controllers\Reports;

use App\Enums\Enums\OrderStatusesEnum;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\View;

class UserSalesByAccountReportController extends Controller
{
    public function index(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);

        $reportData = $this->getQuery($startDate, $endDate);

        return Inertia::render('Reports/UserSalesByAccountReport', [
            'userSales' => Inertia::defer(fn () => $reportData),
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);
    }

    public function exportExcel(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);
        $reportData = $this->getQuery($startDate, $endDate);

        $fileName = 'user_account_sales_' . now()->format('Ymd_His') . '.xlsx';

        return Excel::download(new class($reportData) implements \Maatwebsite\Excel\Concerns\FromView {
            public $reportData;

            public function __construct($reportData)
            {
                $this->reportData = $reportData;
            }

            public function view(): \Illuminate\Contracts\View\View
            {
                return View::make('reports.user_account_sales_excel', [
                    'userSales' => $this->reportData
                ]);
            }
        }, $fileName);
    }

    public function exportPdf(Request $request)
    {
        [$startDate, $endDate] = $this->getDates($request);
        $reportData = $this->getQuery($startDate, $endDate);

        $pdf = Pdf::loadView('pdf.user-account-sales-report', [
            'userSales' => $reportData,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
        ]);

        return $pdf->download('user_account_sales_report.pdf');
    }

    protected function getDates(Request $request): array
    {
        $startDate = Carbon::parse($request->startDate ?? now()->startOfMonth())->startOfDay();
        $endDate = Carbon::parse($request->endDate ?? now()->endOfMonth())->endOfDay();

        return [$startDate, $endDate];
    }

    protected function getQuery(Carbon $startDate, Carbon $endDate)
    {
        return PaymentMethod::select('users.id', 'users.name', 'payment_methods.name as account')
                    ->selectRaw('SUM(order_items.total) as total_sales')
                    ->selectRaw('SUM(order_items.profit) as total_profit')
                    ->join('orders', 'orders.payment_method_id', '=', 'payment_methods.id')
                    ->join('order_items', 'order_items.order_id', '=', 'orders.id')
                    ->join('users', 'users.id', '=', 'orders.user_id')
                    ->groupBy(['users.id', 'payment_methods.name'])
                    ->whereBetween('orders.created_at', [$startDate, $endDate])
                    ->where('payment_methods.company_id', auth()->user()->company_id)
                    ->where('orders.status', OrderStatusesEnum::PAID->value)
                    ->withoutGlobalScopes()
                    ->orderBy('users.id')
                    ->get();
    }
}

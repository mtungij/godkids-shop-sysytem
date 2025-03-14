<?php

namespace App\Exports;

use App\Models\Product;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SalesByProductExport implements FromQuery, WithHeadings
{
    protected $startDate;
    protected $endDate;

    public function __construct(Carbon $startDate, Carbon $endDate)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function query()
    {
        return Product::query()
             ->select()
            ->whereRelation('orderItems', 'created_at', '>=', $this->startDate)
            ->whereRelation('orderItems', 'created_at', '<=', $this->endDate)
            ->withSum('orderItems', 'total')
            ->withSum('orderItems', 'profit')
            ->withSum('orderItems', 'qty')
            ->orderBy('order_items_sum_total', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Total Sales',
            'Total Profit',
            'Total Quantity',
        ];
    }
}

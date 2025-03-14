<table>
    <thead>
        <tr>
            <th>User</th>
            <th>Account</th>
            <th>Total Sales</th>
            <th>Total Pprofit</th>
        </tr>
    </thead>
    @php
        $totalsales = 0;
        $totalProfit = 0;
    @endphp
    <tbody>
        @if ($userSales->isEmpty())
            <tr>
                <td colspan="4" style="text-align: center;">No data available for the selected date range.</td>
            </tr>
        @else
            @foreach ($userSales as $item)
            @php
                $totalsales += $item->total_sales;
                $totalProfit += $item->total_profit;
            @endphp
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->account }}</td>
                    <td>{{ number_format($item->total_sales, 2) }}</td>
                    <td>{{ number_format($item->total_profit, 2) }}</td>
                </tr>
            @endforeach
                <tr>
                    <td>TOTALS</td>
                    <td></td>
                    <td>{{ number_format($totalsales, 2) }}</td>
                    <td>{{ number_format($totalProfit, 2) }}</td>
                </tr>
        @endif
    </tbody>
</table>
<!DOCTYPE html>
<html>
<head>
    <title>user sales by account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: right;
        }
        td:first-child, th:first-child {
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
        h1, h2 {
            text-align: center;
        }
    </style>
</head>
<body>
    <h1> {{ auth()->user()->company->name }}</h1>
    <h2>User Sales by account</h1>
    <p>Date Range: {{ $startDate }} to {{ $endDate }}</p>
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
                <tfoot>
                    <tr>
                        <td>TOTALS</td>
                        <td></td>
                        <td><b>{{ number_format($totalsales, 2) }}</b></td>
                        <td><b>{{ number_format($totalProfit, 2) }}</b></td>
                    </tr>
                </tfoot>
            @endif
        </tbody>
    </table>
</body>
</html>

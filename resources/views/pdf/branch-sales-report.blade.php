<!DOCTYPE html>
<html>
<head>
    <title>Branch Sales Report</title>
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
    <h2>Branch Sales Report</h1>
    <p>Date Range: {{ $startDate }} to {{ $endDate }}</p>
    <table>
        <thead>
            <tr>
                <th>Branch</th>
                <th>Expenses</th>
                <th>Sales</th>
                <th>Net Sales</th>
                <th>Profit</th>
                <th>Net Profit</th>
            </tr>
        </thead>
        <tbody>
            @if ($branches->isEmpty())
                <tr>
                    <td colspan="4" style="text-align: center;">No data available for the selected date range.</td>
                </tr>
            @else
                @foreach ($branches as $branch)
                    <tr>
                        <td>{{ $branch->name }}</td>
                        <td>{{ number_format($branch->expenses, 2) }}</td>
                        <td>{{ number_format($branch->sales, 2) }}</td>
                        <td>{{ number_format($branch->sales - $branch->expenses, 2) }}</td>
                        <td>{{ number_format($branch->profit, 2) }}</td>
                        <td>{{ number_format($branch->profit - $branch->expenses, 2) }}</td>
                    </tr>
                @endforeach
            @endif
        </tbody>
    </table>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <title>user Sales Report</title>
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
    <h2>Sellers Report</h1>
    <p>Date Range: {{ $startDate }} to {{ $endDate }}</p>
    <table>
        <thead>
            <tr>
                <th>Seller/User</th>
                <th>Expenses</th>
                <th>Sales</th>
                <th>Net Sales</th>
                <th>Profit</th>
                <th>Net Profit</th>
                <th>Credit Collections </th>
            </tr>
        </thead>
        <tbody>
            @if ($users->isEmpty())
                <tr>
                    <td colspan="4" style="text-align: center;">No data available for the selected date range.</td>
                </tr>
            @else
                @foreach ($users as $user)
                    <tr>
                        <td>{{ $user->name }}</td>
                        <td>{{ number_format($user->expenses, 2) }}</td>
                        <td>{{ number_format($user->sales, 2) }}</td>
                        <td>{{ number_format($user->sales - $user->expenses, 2) }}</td>
                        <td>{{ number_format($user->profit, 2) }}</td>
                        <td>{{ number_format($user->profit - $user->expenses, 2) }}</td>
                        <td>{{ number_format($user->credit_collections, 2) }}</td>
                    </tr>
                @endforeach
            @endif
        </tbody>
    </table>
</body>
</html>

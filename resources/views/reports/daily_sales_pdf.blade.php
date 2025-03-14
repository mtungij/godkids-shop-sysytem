<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Sales Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
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
    <h1>{{ auth()->user()->company->name }}</h1>
    <h2>Daily Sales Report</h2>
    <p>From: {{ $startDate }} To: {{ $endDate }}</p>
    <table>
        <thead>
            <tr>
                <th>Day</th>
                <th>Sales</th>
                <th>Profit</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($dailySales as $sale)
                <tr>
                    <td>{{ $sale->day }}</td>
                    <td>{{ number_format($sale->sales, 2) }}</td>
                    <td>{{ number_format($sale->profit, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

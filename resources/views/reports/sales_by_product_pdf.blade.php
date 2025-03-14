<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales By Product Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 15px;
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
    <h2>Sales By Product Report</h1>
    <p>From: {{ $startDate }} To: {{ $endDate }}</p>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Total Sales</th>
                <th>Total Profit</th>
                <th>Total Quantity</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($sales as $sale)
                <tr>
                    <td>{{ $sale->name }}</td>
                    <td>{{ number_format($sale->order_items_sum_total, 2) }}</td>
                    <td>{{ number_format($sale->order_items_sum_profit, 2) }}</td>
                    <td>{{ $sale->order_items_sum_qty }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

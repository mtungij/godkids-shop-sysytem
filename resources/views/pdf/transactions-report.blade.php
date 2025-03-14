<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Sales Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
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
    <h2>Account Transactions</h2>
    <p>From: {{ $startDate }} To: {{ $endDate }}</p>
    <table>
        <thead>
            <tr>
                <th>DATE</th>
                <th>USER</th>
                <th>BRANCH</th>
                <th>ACCOUNT</th>
                <th>STATUS</th>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>A.BALANCE</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($transactions as $transaction)
                <tr>
                    <td>{{ date('d/m/Y H:m', strtotime($transaction->created_at)) }}</td>
                    <td>{{ $transaction->user?->name }}</td>
                    <td>{{ $transaction->account?->branch?->name }}</td>
                    <td>{{ $transaction->account?->paymentMethod?->name }}</td>
                    <td>{{ $transaction->type }}</td>
                    <td>{{ $transaction->description }}</td>
                    <td>{{ number_format($transaction->amount, 2) }}</td>
                    <td>{{ number_format($transaction->balance, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

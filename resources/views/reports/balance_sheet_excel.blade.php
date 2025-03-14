<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balance sheet pdf report</title>
    <style>
        /* Table styling */
        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #e0e0e0;
        }
        th, td {
            border: 1px solid #e0e0e0;
            padding: 8px 12px;
            text-align: left;
        }
        th {
            background-color: #f7f7f7;
            font-weight: bold;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>
    <h1>{{ auth()->user()->company->name }}</h1>
    <h2> Balance sheet per each branch</h2>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Branch Name</th>
                    <th>Account Name</th>
                    <th class="text-right">Balance</th>
                    <th>Last Used</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($branches as $branch)
                    @foreach ($branch->accounts as $account)
                        <tr>
                            @if ($loop->first)
                                <td rowspan="{{ $branch->accounts->count() }}">
                                    {{ $branch->name }}
                                </td>
                            @endif
                            <td>{{ $account->paymentMethod->name }}</td>
                            <td class="text-right">{{ number_format($account->amount, 2) }}</td>
                            <td>{{ $account->updated_at->format('d-M-Y H:m') }}</td>
                        </tr>
                    @endforeach
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>

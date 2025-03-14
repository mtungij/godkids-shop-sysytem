  <h2>Accounts Transactions Reports</h2>
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

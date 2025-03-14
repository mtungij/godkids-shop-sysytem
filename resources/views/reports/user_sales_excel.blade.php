
<table>
    <thead>
        <tr>
            <th>User/Seller</th>
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


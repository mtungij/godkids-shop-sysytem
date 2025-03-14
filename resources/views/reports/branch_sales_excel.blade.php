
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


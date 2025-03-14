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
                <td>{{ number_format($sale->sales) }}</td>
                <td>{{ number_format($sale->profit) }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

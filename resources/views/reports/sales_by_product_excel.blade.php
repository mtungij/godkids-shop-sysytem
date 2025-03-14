<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Total Quantity</th>
            <th>Total Sales</th>
            <th>Total Profit</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($sales as $sale)
            <tr>
                <td>{{ $sale->name }}</td>
                <td>{{ $sale->order_items_sum_qty }}</td>
                <td>{{ $sale->order_items_sum_total }}</td>
                <td>{{ $sale->order_items_sum_profit }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

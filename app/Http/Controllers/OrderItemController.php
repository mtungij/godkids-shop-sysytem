<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function update(Request $request, OrderItem $orderItem)
    {
        $validated = $request->validate([
            'qty' => 'required|numeric|min:0',
        ]);

        $orderItem->update($validated);

        return redirect()->back();
    }

    public function destroy(OrderItem $orderItem): RedirectResponse
    {
        $orderItem->delete();

        return redirect()->back();
    }
}


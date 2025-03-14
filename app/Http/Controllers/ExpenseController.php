<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseController extends Controller
{
    public function index():Response
    {
        return Inertia::render('Expenses/Index',[
            'expenses' => Inertia::defer(fn () =>
                                         Expense::with(['paymentMethod', 'user'])
                                                ->whereDate('created_at', today())
                                                ->where('branch_id', auth()->user()->branch_id)
                                                ->orderBy('user_id')
                                                ->orderBy('created_at')
                                                ->get()),
            'paymentMethods' => Inertia::defer(fn () => auth()->user()->company->paymentMethods),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'item' => ['required', 'string', 'max:100'],
            'cost' => ['required', 'numeric', 'min:0', 'max:9999999999'],
            'payment_method_id' => ['required', 'exists:payment_methods,id'],
        ]);

        Expense::create([
            'branch_id' => auth()->user()->branch_id,
            'user_id' => auth()->id(),
            'item' => $request->item,
            'cost' => $request->cost,
            'payment_method_id' => $request->payment_method_id,
        ]);

        return redirect()->back();
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        return redirect()->back();
    }
}

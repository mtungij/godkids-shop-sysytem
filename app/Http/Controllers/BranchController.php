<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Account;
use App\Models\AccountTransaction;
use App\Models\Branch;
use App\Models\PaymentMethod;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $branches = Branch::with('company')->paginate(10);
        return inertia('Branches/Index', [
            'branches'=> Inertia::defer(fn () => $branches)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia('Branches/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBranchRequest $request)
    {
        $validated = $request->validated();

        $validated['company_id'] = auth()->user()->company_id;

        $branch = Branch::create($validated);

        $payments = PaymentMethod::where('company_id', auth()->user()->company_id)->get();

        foreach($payments as $payment) {
            Account::firstOrCreate([
                'branch_id' => $branch->id,
                'payment_method_id' => $payment->id,
            ]);
        }

        if($request->registering) {
            auth()->user()->update(['branch_id' => $branch->id]);
            return redirect()->route('congratulations');
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        return Inertia::render('Branches/Show', [
            'branch' => $branch
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        return Inertia::render('Branches/Edit', [
            'branch' => $branch
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $validated = $request->validated();

        $branch->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return back();
    }


    public function transactions(Branch $branch): Response
    {
        return Inertia::render('Branches/Transactions', [
            'transactions' => Inertia::defer(fn () => 
                                $branch->transactions()
                                       ->with(['user', 'account.paymentMethod'])
                                       ->latest()
                                       ->paginate(50)),
            'branch' => fn () => $branch,
        ]);
    }
}

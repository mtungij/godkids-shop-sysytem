<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentMethodRequest;
use App\Http\Requests\UpdatePaymentMethodRequest;
use App\Models\PaymentMethod;
use Inertia\Inertia;
use Inertia\Response;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('PaymentMethods/Index', [
            'paymentMethods' => Inertia::defer(fn () => 
                                                PaymentMethod::with('company')
                                                                ->withSum('accounts', 'amount')
                                                                ->get()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentMethodRequest $request)
    {
        $validated = $request->validated();

        $validated['company_id'] = auth()->user()->company_id;

        PaymentMethod::create($validated);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentMethod $paymentMethod): Response
    {
        return Inertia::render('PaymentMethods/Show', [
            'paymentMethod' => $paymentMethod->load('company'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentMethodRequest $request, PaymentMethod $paymentMethod)
    {
        $validated = $request->validated();

        $paymentMethod->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();
    }
}

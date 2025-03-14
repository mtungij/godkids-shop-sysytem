<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => Inertia::defer(fn () => auth()->user()->company->users()->with('branch')->paginate(15)),
            'branches' => Inertia::defer(fn () => Branch::get())
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:15|min:9|unique:'.User::class,
            'role' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'password' => ['required', 'confirmed', 'min:4', 'max:20'],
        ]);

        $validated['company_id'] = auth()->user()->company_id;
        $validated['branch_id'] = Branch::first()->id;

        $user = User::create([
            ...$validated,
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'branches' => fn () => Branch::get(),
            'user' => fn () => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$user->id}",
            'role' => 'required',
            'branch_id' => 'required|exists:branches,id', // Ensure branch_id exists in the branches table
            'phone' => "required|string|min:9|max:20|unique:users,phone,{$user->id}",
            'gender' => 'required|string|max:10',
        ]);

        $user->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return back();
    }

    public function block(User $user): RedirectResponse
    {
        if ($user->isActive)
            $user->update(['isActive' => false]);
        else
            $user->update(['isActive' => true]);

        return back();
    }


    public function switchBranch(Branch $branch): RedirectResponse
    {
        auth()->user()->update(['branch_id' => $branch->id]);
        return back();
    }

    
    public function transactions(User $user): Response
    {
        return Inertia::render('Users/Transactions', [
            'transactions' => Inertia::defer(fn () => 
                                     $user->accountTransactions()->with(['account' => ['paymentMethod', 'branch']])
                                          ->latest()
                                          ->paginate(25)),
            'user' => $user,
        ]);
    }

    public function orders(User $user): Response
    {
        return Inertia::render('Users/Orders', [
            'orders' => Inertia::defer(fn () => 
                            $user->orders()->with(['branch', 'user', 'paymentMethod', 'customer'])
                                ->withSum('orderItems', 'total')
                                // ->where('status', OrderStatusesEnum::CREDIT)
                                // ->where(function ($query) use ($search) {
                                //     $query->where('invoice_no', 'LIKE', "%$search%")
                                //         ->orWhereHas('customer', function ($query) use ($search) {
                                //             $query->where('name', 'LIKE', "%$search%");
                                //         });
                                // })
                                ->latest()
                                ->paginate(50)
                        ),
            'user' => $user,
        ]);
    }


    public function expenses(User $user): Response
    {
        return Inertia::render('Users/Expenses', [
            'user' => $user,
            'expenses' => Inertia::defer( fn () =>
                $user->expenses()
                     ->with(['branch', 'paymentMethod', 'user'])
                     ->latest()
                     ->paginate(25)
            ),
        ]);
    }

    public function creditCollections(User $user): Response
    {
        return Inertia::render('Users/CreditCollections', [
            'creditCollections' => Inertia::defer( fn () =>
                $user->creditOrderPayments()
                     ->with(['user', 'branch', 'paymentMethod', 'order.customer'])
                     ->latest()
                     ->paginate(25)
            ),
            'user' => $user,
        ]);
    }


    public function purchases(User $user): Response
    {
        return Inertia::render('Users/Purchases', [
            'user' => $user,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $search = request()->search ?? null;
        
        return Inertia::render('Products/Index', [
            'products' => Inertia::defer(fn () =>
                                     Product::where('name', 'LIKE', "%{$search}%")
                                                   ->where('branch_id', auth()->user()->branch_id)
                                                    ->latest()
                                                    ->paginate(25)),
            'capital' => Inertia::defer(fn () => Product::where('branch_id', auth()->user()->branch_id)->sum('capital')),
            'sales' => Inertia::defer(fn () => Product::where('branch_id', auth()->user()->branch_id)->sum('sales')),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create():Response
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $img_path = null;

        dd($request->img);

        if ($request->hasFile('img')) {
            $img_path = $request->file('img')->store('products/images', 'public');
        }

        $validated['branch_id'] = auth()->user()->branch_id;

        Product::create([...$validated, 'img' => $img_path]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $product->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }
}

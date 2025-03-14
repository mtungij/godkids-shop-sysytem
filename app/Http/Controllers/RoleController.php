<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::where('company_id', $request->user()->company_id)->get();
        return inertia('Roles/Index', compact('roles'));
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        
        Role::create([
            'name' => $request->name,
            'company_id' => $request->user()->company_id,
            'guard_name' => 'web',
        ]);
        return redirect()->back()->with('success', 'Role created successfully!');
    }
}

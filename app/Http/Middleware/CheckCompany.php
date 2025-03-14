<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

class CheckCompany
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // List of routes to allow only if the user does NOT have a company_id
        $companyCreationRoutes = [
            'companies.create',
            'companies.store',
            'verification.notice',
            'verification.verify',
            'verification.send',
            'logout',
        ];

        if (Auth::check()) {
            if (!Auth::user()->company_id) {
                // Redirect if the user does not have a company_id and is not on allowed routes
                if (!in_array($request->route()->getName(), $companyCreationRoutes)) {
                    return redirect()->route('companies.create');
                }
            } else {
                // Redirect if the user has a company_id and tries to access creation routes
                if (in_array($request->route()->getName(),  Arr::take($companyCreationRoutes, 1))) {
                    return redirect()->route('dashboard'); // Change 'dashboard' to a suitable route
                }
            }
        }

        // Proceed with the request
        return $next($request);
    }
}

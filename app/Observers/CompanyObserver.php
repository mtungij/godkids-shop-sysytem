<?php

namespace App\Observers;

use App\Mail\WelcomeMail;
use App\Models\Company;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Mail;

class CompanyObserver
{
    /**
     * Handle the Company "created" event.
     */
    public function created(Company $company): void
    {
        PaymentMethod::create([
            'name' => 'CASH',
            'company_id' => $company->id,
        ]);

        // send welcome email to a user
        // Mail::to(request()->user())
        //     ->later(now()->addMinutes(2), new WelcomeMail());
    }

    /**
     * Handle the Company "updated" event.
     */
    public function updated(Company $company): void
    {
        //
    }

    /**
     * Handle the Company "deleted" event.
     */
    public function deleted(Company $company): void
    {
        //
    }

    /**
     * Handle the Company "restored" event.
     */
    public function restored(Company $company): void
    {
        //
    }

    /**
     * Handle the Company "force deleted" event.
     */
    public function forceDeleted(Company $company): void
    {
        //
    }
}

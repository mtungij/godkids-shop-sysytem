<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('create:accounts', function () {
    // Create accounts for each company from it's payment methods in case the payment method has an account
    
})->purpose('Create company accounts')->daily();

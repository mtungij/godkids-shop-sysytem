<?php

namespace App\Models;

use App\Models\Scopes\BranchCompanyScope;
use App\Models\Scopes\UserScope;
use App\Observers\ExpenseObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(ExpenseObserver::class)]
#[ScopedBy([BranchCompanyScope::class, UserScope::class])]
class Expense extends Model
{
    protected $fillable = [
        'branch_id',
        'user_id',
        'payment_method_id',
        'item',
        'cost',
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}

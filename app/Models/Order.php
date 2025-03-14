<?php

namespace App\Models;

use App\Models\Scopes\BranchCompanyScope;
use App\Models\Scopes\UserScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([BranchCompanyScope::class, UserScope::class])]
class Order extends Model
{
    protected $fillable = [
        'branch_id',
        'user_id',
        'payment_method_id',
        'customer_id',
        'invoice_no',
        'order_date',
        'status',
        'created_at',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function creditOrderPayments(): HasMany
    {
        return $this->hasMany(CreditOrderPayment::class);
    }
}

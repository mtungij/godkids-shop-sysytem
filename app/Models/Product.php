<?php

namespace App\Models;

use App\Models\Scopes\BranchCompanyScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Traits\HasPermissions;

#[ScopedBy(BranchCompanyScope::class)]
class Product extends Model
{
    use HasPermissions, HasFactory;
    
    protected $fillable = [
        'branch_id',
        'user_id',
        'img',
        'name',
        'unit',
        'buy_price',
        'sell_price',
        'stock',
        'stock_alert',
        'unique_id',
        'expired_date',
        'whole_price',
        'whole_stock',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function purchaseOrderItems(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }
}

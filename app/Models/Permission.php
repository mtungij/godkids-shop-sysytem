<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    protected $fillable = ['name', 'company_id', 'guard_name'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}


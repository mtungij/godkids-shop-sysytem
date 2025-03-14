<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $fillable = ['name', 'company_id', 'guard_name'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
    
}

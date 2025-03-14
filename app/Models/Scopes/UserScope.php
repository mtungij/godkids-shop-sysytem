<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class UserScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $userRole = auth()->user()->role;

        if (auth()->check() && $userRole == 'seller' || $userRole == 'vendor')
              $builder->where('user_id', auth()->id());
    }
}

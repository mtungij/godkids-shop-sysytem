<?php

namespace App\Enums\Enums;

enum OrderStatusesEnum: string
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case CREDIT = 'credit';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Pending',
            self::PAID => 'Paid',
            self::CREDIT => 'Credit',
            self::CANCELLED => 'Cancelled',
        };
    }
}
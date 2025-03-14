<?php

namespace App\Enums;

enum RolesEnum: string
{
    case SUPER_ADMIN = 'super admin';
    case ADMIN = 'admin';
    case MANAGER = 'manager';
    case SELLER = 'seller';
    case VENDOR = 'vendor';

    public static function labels(): array
    {
        return [
            self::SUPER_ADMIN->value => 'Super Admin',
            self::ADMIN->value => 'Admin',
            self::MANAGER->value => 'Manager',
            self::SELLER->value => 'Seller',
            self::VENDOR->value => 'Vendor',
        ];
    }

    public function label(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN => 'Admin',
            self::MANAGER => 'Manager',
            self::SELLER => 'Seller',
            self::VENDOR => 'Vendor',
        };
    }
    
}
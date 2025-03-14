<?php

namespace Database\Seeders;

use App\Enums\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $superAdminRole = Role::create(['name' => RolesEnum::SUPER_ADMIN]);
        // $adminRole = Role::create(['name' => RolesEnum::ADMIN]);
        // $managerRole = Role::create(['name' => RolesEnum::MANAGER]);
        // $sellerRole = Role::create(['name' => RolesEnum::SELLER]);
        // $vendorRole = Role::create(['name' => RolesEnum::VENDOR]);

        // // products permissions
        // $createProductPermission = Permission::create(['name' => PermissionsEnum::CREATE_PRODUCT]);
        // $updateProductPermission = Permission::create(['name' => PermissionsEnum::UPDATE_PRODUCT]);
        // $deleteProductPermission = Permission::create(['name' => PermissionsEnum::DELETE_PRODUCT]);
        // $viewProductPermission = Permission::create(['name' => PermissionsEnum::VIEW_PRODUCT]);

        // // orders permissions
        // $createOrderPermission = Permission::create(['name' => PermissionsEnum::CREATE_ORDER]);
        // $updateOrderPermission = Permission::create(['name' => PermissionsEnum::UPDATE_ORDER]);
        // $deleteOrderPermission = Permission::create(['name' => PermissionsEnum::DELETE_ORDER]);
        // $viewOrderPermission = Permission::create(['name' => PermissionsEnum::VIEW_ORDER]);
        
        // // users permissions
        // $createUserPermission = Permission::create(['name' => PermissionsEnum::CREATE_USER]);
        // $updateUserPermission = Permission::create(['name' => PermissionsEnum::UPDATE_USER]);
        // $deleteUserPermission = Permission::create(['name' => PermissionsEnum::DELETE_USER]);
        // $viewUserPermission = Permission::create(['name' => PermissionsEnum::VIEW_USER]);

        // // sync permissions to roles

        // $superAdminRole->syncPermissions([
        //     $createProductPermission,
        //     $updateProductPermission,
        //     $deleteProductPermission,
        //     $viewProductPermission,
        //     $createOrderPermission,
        //     $updateOrderPermission,
        //     $deleteOrderPermission,
        //     $viewOrderPermission,
        //     $createUserPermission,
        //     $updateUserPermission,
        //     $deleteUserPermission,
        //     $viewUserPermission,
        // ]);

        // $sellerRole->syncPermissions([
        //     $viewProductPermission,
        // ]);

        // User::factory()->create([
        //     'name' => 'Super Admin',
        //     'email' => 'superadmin@example.com',
        //     'password' => 'password',
        // ])->assignRole(RolesEnum::SUPER_ADMIN->value);

        // User::factory()->create([
        //     'name' => 'Admin',
        //     'email' => 'admin@example.com',
        //     'password' => 'password',
        // ])->assignRole(RolesEnum::ADMIN->value);

        // User::factory()->create([
        //     'name' => 'Manager',
        //     'email' => 'manager@example.com',
        //     'password' => 'password',
        // ])->assignRole(RolesEnum::MANAGER->value);

        // User::factory()->create([
        //     'name' => 'Seller',
        //     'email' => 'seller@example.com',
        //     'password' => 'password',
        // ])->assignRole(RolesEnum::SELLER->value);

        // User::factory()->create([
        //     'name' => 'Vendor',
        //     'email' => 'vendor@example.com',
        //     'password' => 'password',
        // ])->assignRole(RolesEnum::VENDOR->value);

        $this->call(ProductSeeder::class);
        $this->call(HardwareProductSeeder::class);
        $this->call(SupermarketProductSeeder::class);
        $this->call(PharmacyProductSeeder::class);
    }
}

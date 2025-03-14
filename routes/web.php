<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CreditOrderPaymentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\MySalesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Reports\BalanceSheetReportController;
use App\Http\Controllers\Reports\BranchSalesReportController;
use App\Http\Controllers\Reports\DailySalesController;
use App\Http\Controllers\Reports\OrderItemReportController;
use App\Http\Controllers\Reports\SalesByProductController;
use App\Http\Controllers\Reports\TransactionsReportController;
use App\Http\Controllers\Reports\UserSalesByAccountReportController;
use App\Http\Controllers\Reports\UserSalesReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RemoveCommaFromInput;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return to_route('login');
    return Inertia::render('Welcome');
});

Route::get('reports', function () {
    return Inertia::render('Reports');
})->middleware(['auth', 'verified'])->name('reports');

Route::get('my-sales', [MySalesController::class, 'index'])
     ->middleware(['auth', 'verified'])
     ->name('my-sales');

Route::post('/upload', [FileUploadController::class, 'avatar'])
    ->middleware(['auth', 'verified']);

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';


Route::resource('companies', \App\Http\Controllers\CompanyController::class)
     ->middleware(['auth', 'verified'])
     ->only(['index', 'create', 'store', 'update', 'destroy']);

Route::resource('branches', \App\Http\Controllers\BranchController::class)
     ->middleware(['auth', 'verified'])
     ->only(['index', 'create', 'store', 'update', 'destroy']);

Route::get('branches/{branch}/transactions', [BranchController::class, 'transactions'])
    ->middleware(['auth', 'verified'])
    ->name('branches.transactions');

Route::get('congratulations', function () {
    return Inertia::render('congraturation');
})->middleware(['auth', 'verified'])->name('congratulations');

Route::resource('users', UserController::class)
    ->middleware(['auth', 'verified'])
    ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);

Route::prefix('users')->controller(UserController::class)->middleware(['verified', 'auth'])->group(function () {
    Route::post('{user}/block', 'block')
        ->name('users.block');

    Route::post('switch-branch/{branch}', 'switchBranch')
        ->name('switch-branch');

    Route::get('{user}/transactions', 'transactions')->name('users.transactions');
    Route::get('{user}/orders', 'orders')->name('users.orders');
    Route::get('{user}/expenses', 'expenses')->name('users.expenses');
    Route::get('{user}/creditCollections', 'creditCollections')->name('users.creditCollections');
    Route::get('{user}/purchases', 'purchases')->name('users.purchases');
});



Route::resource('paymentMethods', \App\Http\Controllers\PaymentMethodController::class)
    ->middleware(['auth', 'verified'])
    ->only(['index', 'create', 'store', 'update', 'destroy']);

Route::get('accounts', [AccountController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('accounts.index');

Route::resource('products', ProductController::class)
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class])
    ->only(['index', 'create', 'store', 'update', 'destroy']);

Route::resource('customers', \App\Http\Controllers\CustomerController::class)
    ->middleware(['auth', 'verified'])
    ->only(['index', 'store', 'update', 'destroy']);


Route::prefix('pos')->middleware(['auth', 'verified', RemoveCommaFromInput::class])->group(function () {
    Route::get('index', [PosController::class, 'index'])->name('pos.index');
    Route::post('sell', [PosController::class, 'sell'])->name('pos.sell');

    Route::get('invoices/{order}', [PosController::class, 'invoice'])->name('pos.invoice');
});


// ordders Routes
Route::controller(OrderController::class)->prefix('orders')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', 'index')->name('orders.index');
    Route::delete('{order}', 'destroy')->name('orders.destroy');
    Route::get('credit-orders', 'creditOrders')->name('orders.creditOrders');
    Route::get('pending-orders', 'pendingOrders')->name('orders.pendingOrders');
    Route::get('pending-orders/{order}', 'editPendingOrder')->name('orders.pendingOrders.edit');
    Route::patch('pending-orders/{order}/confirm-all', 'confirmAllPendingItems')->name('orders.pendingOrders.confirm-all');
    Route::patch('pending-orders/{order}/confirm', 'confirmPendingOrder')->name('orders.pendingOrders.confirm');
    Route::patch('pending-orders/{order}/cancel', 'cancelPendingOrder')->name('orders.pendingOrders.cancel');
});


Route::middleware(['auth', 'verified', RemoveCommaFromInput::class])->group(function () {
    Route::post('credit-orders/{creditOrder}', [CreditOrderPaymentController::class, 'store'])
        ->name('credit-orders.store');
});

Route::resource('orderItems', \App\Http\Controllers\OrderItemController::class)
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class])
    ->only(['update', 'destroy']);

Route::resource('expenses', \App\Http\Controllers\ExpenseController::class)
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class])
    ->only(['index', 'store', 'update', 'destroy']);

Route::resource('suppliers', \App\Http\Controllers\SupplierController::class)
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class])
    ->only(['index', 'store', 'update', 'destroy']);


Route::resource('purchases', \App\Http\Controllers\PurchaseOrderController::class)
    ->middleware(['auth', 'verified', RemoveCommaFromInput::class])
    ->only(['index', 'create', 'show', 'store', 'update', 'destroy']);


Route::prefix('reports')->middleware(['auth', 'verified'])->group(function () {
    Route::get('order-items', [OrderItemReportController::class, 'index'])->name('reports.order-items');
    Route::get('sales-by-product', [SalesByProductController::class, 'index'])->name('reports.sales-by-product');
    Route::get('sales-by-product/export-excel', [SalesByProductController::class, 'exportExcel'])->name('reports.sales-by-product.export-excel');
    Route::get('sales-by-product/export-pdf', [SalesByProductController::class, 'exportPdf'])->name('reports.sales-by-product.export-pdf');

    Route::get('daily-sales', [DailySalesController::class, 'index'])->name('reports.daily-sales');
    Route::get('daily-sales/export-excel', [DailySalesController::class, 'exportExcel'])->name('reports.daily-sales.export-excel');
    Route::get('daily-sales/export-pdf', [DailySalesController::class, 'exportPdf'])->name('reports.daily-sales.export-pdf');

    Route::get('branch-sales', [BranchSalesReportController::class, 'index'])->name('reports.branch-sales');
    Route::get('branch-sales/export-excel', [BranchSalesReportController::class, 'exportExcel'])->name('reports.branch-sales.export-excel');
    Route::get('branch-sales/export-pdf', [BranchSalesReportController::class, 'exportPdf'])->name('reports.branch-sales.export-pdf');

    // user-sales
    Route::get('user-sales', [UserSalesReportController::class, 'index'])->name('reports.user-sales');
    Route::get('user-sales/export-excel', [UserSalesReportController::class, 'exportExcel'])->name('reports.user-sales.export-excel');
    Route::get('user-sales/export-pdf', [UserSalesReportController::class, 'exportPdf'])->name('reports.user-sales.export-pdf');

    Route::get('balance-sheet', [BalanceSheetReportController::class, 'index'])->name('reports.balance-sheet');
    Route::get('balance-sheet/export-excel', [BalanceSheetReportController::class, 'exportExcel'])->name('reports.balance-sheet.export-excel');
    Route::get('balance-sheet/export-pdf', [BalanceSheetReportController::class, 'exportPdf'])->name('reports.balance-sheet.export-pdf');

    Route::get('transactions', [TransactionsReportController::class, 'index'])->name('reports.transactions');
    Route::get('transactions/export-excel', [TransactionsReportController::class, 'exportExcel'])->name('reports.transactions.export-excel');
    Route::get('transactions/export-pdf', [TransactionsReportController::class, 'exportPdf'])->name('reports.transactions.export-pdf');

    Route::get('account-user-sales', [UserSalesByAccountReportController::class, 'index'])->name('reports.account-user-sales');
    Route::get('account-user-sales/export-excel', [UserSalesByAccountReportController::class, 'exportExcel'])->name('reports.account-user-sales.export-excel');
    Route::get('account-user-sales/export-pdf', [UserSalesByAccountReportController::class, 'exportPdf'])->name('reports.account-user-sales.export-pdf');
});


// Roles and permissions
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('roles', RoleController::class);
});


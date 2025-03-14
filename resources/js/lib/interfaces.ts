import { Branch, User } from "@/types";
import exp from "constants";

export type PaginationLink = {
    url: string;
    label: string;
    active: boolean;
};

export interface Paginations {
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Users {
    data: User[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Branches {
    data: Branch[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaymentMethod {
    id: number;
    name: string;
    description: string;
    accounts_sum_amount: number;
    created_at: string;
    updated_at: string;
}

export interface PaymentMethods {
    data: PaymentMethod[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Account {
    id: number;
    payment_method_id: number;
    payment_method: PaymentMethod;
    amount: number;
    user: User;
    abbreviation: string;
    created_at: string;
    updated_at: string;
}

export interface Accounts {
    data: Account[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Transaction {
    id: number;
    account_id: number;
    type: string;
    user_id: number;
    user: User;
    account: Account;
    amount: number;
    balance: number;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Transactions {
    data: Transaction[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Product {
    id: number;
    name: string;
    unit: string;
    branch_id: number;
    branch: Branch;
    buy_price: number;
    sell_price: number;
    stock: number;
    stock_alert: number;
    expire_date: string;
    whole_price: number;
    whole_stock: number;
    capital: number;
    order_items_sum_total: number;
    order_items_sum_profit: number;
    order_items_sum_qty: number;
    created_at: string;
    updated_at: string;
}

export interface Products {
    data: Product[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface TrendingProduct {
    id: number;
    name: string;
    total_sold: number;
}

export interface Customer {
    id: number;
    name: string;
    contact: string;
    address: string;
    created_at: string;
    updated_at: string;
}

export interface Customers {
    data: Customer[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Order {
    id: number;
    customer_id: number;
    customer: Customer;
    user_id: number;
    user: User;
    payment_method_id: number;
    payment_method: PaymentMethod;
    branch_id: number;
    branch: Branch;
    order_date: string;
    invoice_no: string;
    status: string;
    order_items: OrderItem[];
    order_items_sum_total: number;
    order_items_sum_discount: number;
    order_items_sum_profit: number;
    order_items_sum_pending_qty: number;
    order_items_sum_qty: number;
    order_items_sum_total_pending_qty: number;
    credit_order_payments_sum_amount: number;
    created_at: string;
    updated_at: string;
}

export interface OrderItems {
    data: OrderItem[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Orders {
    data: Order[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface OrderItem {
    id: number;
    order_id: number;
    order: Order;
    product_id: number;
    product: Product;
    qty: number;
    pending_qty: number;
    buy_price: number;
    price: number;
    total: number;
    profit: number;
    buyy_total: number;
    discount: number;
    profit_percentage: number;
    balance_pending_qty: number;
    balance_pending_total: number;
    created_at: string;
    updated_at: string;
}

export interface Expense {
    id: number;
    branch_id: number;
    branch: Branch;
    user_id: number;
    user: User;
    payment_method_id: number;
    payment_method: PaymentMethod;
    item: string;
    cost: number;
    created_at: string;
    updated_at: string;
}

export interface Expenses {
    data: Expense[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    to: number;
    total: number;
    per_page: number;
    path: string;
}

export interface Supplier {
    id: number;
    name: string;
    contact: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Suppliers {
    data: Supplier[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    to: number;
    total: number;
    per_page: number;
    path: string;
}

export interface PurchaseOrder {
    id: number;
    supplier_id: number;
    supplier: Supplier;
    user_id: number;
    user: User;
    payment_method_id: number;
    payment_method: PaymentMethod;
    branch_id: number;
    branch: Branch;
    reference: string;
    items: PurchaseOrderItem[];
    items_sum_total_buy_price: number;
    items_sum_total_sell_price: number;
    created_at: string;
    updated_at: string;
}

export interface PurchaseOrders {
    data: PurchaseOrder[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    to: number;
    total: number;
    per_page: number;
    path: string;
}

export interface PurchaseOrderItem {
    id: number;
    purchase_order_id: number;
    product_id: number;
    product: Product;
    stock: number;
    buy_price: number;
    sell_price: number;
    total_buy_price: number;
    total_sell_price: number;
    created_at: string;
    updated_at: string;
}

export interface PurchaseOrderItems {
    data: PurchaseOrderItem[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    to: number;
    total: number;
    per_page: number;
    path: string;
}

export interface CreditCollection {
    id: number;
    order: Order;
    payment_method: PaymentMethod;
    branch: Branch;
    user: User;
    amount: number;
    created_at: string;
}

export interface CreditCollections {
    data: CreditCollection[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    from: number;
    to: number;
    total: number;
    per_page: number;
    path: string;
}

export interface Can {
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    export: boolean;
    import: boolean;
}
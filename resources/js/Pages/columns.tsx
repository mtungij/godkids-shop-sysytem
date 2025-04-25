import DeleteAction from "@/components/actions/DeleteAction";
import DangerBadge from "@/components/badges/danger-badge";
import ErrorBadge from "@/components/badges/ErrorBadge";
import PendingBadge from "@/components/badges/PendingBadge";
import SuccessBadge from "@/components/badges/success-badge";
import { OrderItem, Product, TrendingProduct } from "@/lib/interfaces";
import { dateFormat, dateTimeFormat, numberFormat } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

export const userOrderItemColumns: ColumnDef<OrderItem>[] = [
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return (
                <div className="text-sm text-muted-foreground">
                    {dateTimeFormat(row.original.created_at)}
                </div>
            );
        },
    },
    {
        accessorKey: "product.name",
        header: "Product",
        cell: ({ row }) => {
            return <div>{row.original.product?.name}</div>;
        },
    },
    {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.qty)}</div>;
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.price)}</div>;
        },
    },
    {
        accessorKey: "discount",
        header: "Discount",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.discount)}</div>;
        },
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.total)}</div>;
        },
    },
    //invoice no
    {
        accessorKey: "invoice.invoice_number",
        header: "Invoice",
        cell: ({ row }) => {
            return (
                <Link
                    href={route("pos.invoice", row.original.order.id)}
                    className="text-cyan-500 hover:underline hover:underline-offset-4 hover:text-cyan-400"
                >
                    #{row.original.order.invoice_no}
                </Link>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const order = row.original.order;
            if (order.status === "pending") {
                return <PendingBadge label={order.status} />;
            } else if (order.status === "paid") {
                return <SuccessBadge label={order.status} />;
            } else if (order.status === "credit") {
                return <DangerBadge label={order.status} />;
            } else {
                return <ErrorBadge label={order.status} />;
            }
        },
    },
    // customer
    {
        accessorKey: "order.customer.name",
        header: "Customer",
        cell: ({ row }) => {
            return (
                <div className="text-sm text-muted-foreground">
                    {row.original.order.customer?.name ?? "--##--"}
                </div>
            );
        },
    },
    {
        accessorKey: "order.customer.phone",
        header: "Phone",
        cell: ({ row }) => {
            return (
                <div className="text-sm text-muted-foreground">
                    {row.original.order.customer?.contact ?? "--##--"}
                </div>
            );
        },
    },
];


export const trendingProductColumns: ColumnDef<TrendingProduct>[] = [
    {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
            return (
                <div className="text-sm text-muted-foreground">
                    {dateTimeFormat(row.original.name)}
                </div>
            );
        },
    },
    {
        accessorKey: "total_sold",
        header: "Total Sold",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.total_sold)}</div>;
        },
    },
];

export const emptyStockColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
            return (
                <div className="text-sm">
                    {dateTimeFormat(row.original.name)}
                </div>
            );
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.stock)}</div>;
        },
    },
];

import { PurchaseOrder, PurchaseOrderItem } from "@/lib/interfaces";
import { dateFormat, dateTimeFormat, numberFormat } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { FileText } from "lucide-react";

export const purchaseOrdersColumns: ColumnDef<PurchaseOrder>[] = [
    {
        accessorKey: "#",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                    {row.original.branch.name[0]}
                </span>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => {
            return (
                <span className="text-muted-foreground text-sm">
                    {dateTimeFormat(row.original.created_at)}
                </span>
            );
        },
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            return <span>{row.original?.user?.name}</span>;
        },
    },
    // reference
    {
        accessorKey: "reference",
        header: "Reference #",
        cell: ({ row }) => {
            return (
                <Link
                    href={route("purchases.show", row.original.id)}
                    className="text-cyan-500 hover:underline hover:underline-offset-4 hover:text-cyan-400"
                >
                    {row.original.reference}
                </Link>
            );
        },
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            return (
                <span>
                    {numberFormat(row.original.items_sum_total_buy_price)}
                </span>
            );
        },
    },
    {
        accessorKey: "supplier",
        header: "Supplier",
        cell: ({ row }) => {
            return <span>{row.original?.supplier?.name}</span>;
        },
    },
    {
        accessorKey: "payment_method",
        header: "Account",
        cell: ({ row }) => {
            return (
                <span className="text-muted-foreground">
                    {row.original.payment_method.name}
                </span>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <Link
                        href={route("purchases.show", row.original.id)}
                        className="text-cyan-500 hover:text-cyan-400"
                    >
                        <FileText className="size-5" />
                    </Link>
                </div>
            );
        },
    },
];

export const purchaseOrderItemsColumns: ColumnDef<PurchaseOrderItem>[] = [
    {
        accessorKey: "#",
        header: "#",
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => {
            return <span>{row.original.product.name}</span>;
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            return <span>{row.original.stock}</span>;
        },
    },
    {
        accessorKey: "buy_price",
        header: "Buy Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.buy_price)}</span>;
        },
    },
    {
        accessorKey: "sell_price",
        header: "Sell Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.sell_price)}</span>;
        },
    },
];

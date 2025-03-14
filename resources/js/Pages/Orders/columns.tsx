import DeleteAction from "@/components/actions/DeleteAction";
import DangerBadge from "@/components/badges/danger-badge";
import ErrorBadge from "@/components/badges/ErrorBadge";
import PendingBadge from "@/components/badges/PendingBadge";
import SuccessBadge from "@/components/badges/success-badge";
import { Order } from "@/lib/interfaces";
import { dateFormatFilter, dateTimeFormat, numberFormat } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

export const orderColumns: ColumnDef<Order>[] = [
    // order date
    {
        accessorKey: "order_date",
        header: "Order Date",
        cell: ({ row }) => (
            <div className="text-muted-foreground text-sm">
                {dateTimeFormat(row.original.created_at)}
            </div>
        ),
    },
    {
        accessorKey: "invoice_no",
        header: "Invoice No",
        cell: ({ row }) => (
            <Link
                href={route("pos.invoice", row.original.id)}
                className="text-cyan-500 hover:underline hover:underline-offset-4 hover:text-cyan-400"
            >
                #{row.getValue("invoice_no")}
            </Link>
        ),
    },
    {
        accessorKey: "customer_name",
        header: "Customer",
        cell: ({ row }) => (
            <div className="font-medium bg-gray">
                {row.original.customer?.name ?? "--##--"}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const order = row.original;
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

    //user
    {
        accessorKey: "user.name",
        header: "Seller",
        cell: ({ row }) => (
            <div className="text-muted-foreground text-sm">
                {row.original.user?.name}
            </div>
        ),
    },

    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
            <div className="">
                {numberFormat(row.original.order_items_sum_total)}
            </div>
        ),
    },
    {
        accessorKey: "payment_method",
        header: "Account",
        cell: ({ row }) => (
            <div className="text-muted-foreground text-sm">
                {row.original.payment_method?.name}
            </div>
        ),
    },
    // {
    //     accessorKey: "branch.name",
    //     header: "Branch",
    //     cell: ({ row }) => <div className="">{row.original.branch?.name}</div>,
    // },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const order = row.original;
            const user = usePage().props.auth.user;
            return (
                <div className="flex gap-x-2">
                    {user.role == "admin" && (
                        <DeleteAction
                            url="orders.destroy"
                            item={row.original}
                            label={`order #${order.invoice_no}`}
                        />
                    )}
                </div>
            );
        },
    },
];

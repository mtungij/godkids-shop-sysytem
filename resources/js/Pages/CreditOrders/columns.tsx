import { Order } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import PayCreditOrder from "./actions/pay-credit-order";

export const creditOrderColumns: ColumnDef<Order>[] = [
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
            <div className="font-medium">{row.original.customer?.name}</div>
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
        accessorKey: "credit_order_payments_sum_amount",
        header: "Paid",
        cell: ({ row }) => (
            <div className="text-green-500">
                {numberFormat(row.original.credit_order_payments_sum_amount)}
            </div>
        ),
    },
    {
        accessorKey: "debt",
        header: "Remain Debt",
        cell: ({ row }) => {
            const total = row.original.order_items_sum_total;
            const paid = row.original.credit_order_payments_sum_amount;
            return (
                <div className="text-red-500">{numberFormat(total - paid)}</div>
            );
        },
    },
    // order date
    {
        accessorKey: "order_date",
        header: "Order Date",
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                {dayjs(row.original.order_date).fromNow()}
            </div>
        ),
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const order = row.original;
            return (
                <div className="flex gap-x-2">
                    <PayCreditOrder order={row.original} />
                </div>);
        }
    }
];

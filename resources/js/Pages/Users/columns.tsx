import ErrorBadge from "@/components/badges/ErrorBadge";
import SuccessBadge from "@/components/badges/success-badge";
import { CreditCollection, Transaction } from "@/lib/interfaces";
import { dateFormat, dateTimeFormat, numberFormat } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { spawn } from "child_process";

export const userTransactionColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "avatar",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                    {row.original.account?.payment_method?.name[0]}
                </span>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return (
                <span className="text-muted-foreground text-sm">
                    {dateTimeFormat(row.original.created_at)}
                </span>
            );
        },
    },
    {
        accessorKey: "type",
        header: "Status",
        cell: ({ row }) => {
            const transaction = row.original;
            if (transaction.type === "deposit") {
                return <SuccessBadge label={transaction.type} />;
            } else {
                return <ErrorBadge label={transaction.type} />;
            }
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return <span className="text-sm">{row.original.description}</span>;
        },
    },
    {
        accessorKey: "account.name",
        header: "Account",
        cell: ({ row }) => {
            return <span>{row.original.account?.payment_method?.name}</span>;
        },
    },
    // {
    //     accessorKey: "branch.name",
    //     header: "Branch",
    //     cell: ({ row }) => {
    //         return (
    //             <span className="text-sm">
    //                 {row.original.account?.branch?.name}
    //             </span>
    //         );
    //     },
    // },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const transaction = row.original;
            if (transaction.type === "deposit")
                return (
                    <span className="text-green-600">
                        + {numberFormat(row.original.amount)}
                    </span>
                );
            else
                return (
                    <span className="text-rose-500">
                        - {numberFormat(row.original.amount)}
                    </span>
                );
        },
    },
    {
        accessorKey: "balance",
        header: "A.Balance",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.balance)}</span>;
        },
    },
];



export const creditCollectionColumns: ColumnDef<CreditCollection>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                    {row.original.payment_method?.name[0]}
                </span>
            );
        },
    },
    {
        accessorKey: 'created-at',
        header: 'Customer',
        cell: ({ row }) => {
            return (<span className="text-sm text-muted-foreground">{dateTimeFormat(row.original.created_at)}</span>)
        }
    },
    {
        accessorKey: 'order.customer.name',
        header: 'Customer',
        cell: ({ row }) => {
            return (<span className="text-sm">{row.original.order?.customer?.name}</span>)
        }
    },  {
        accessorKey: 'payment_method.name',
        header: 'Account',
        cell: ({ row }) => {
            return (<span>{row.original.payment_method?.name}</span>)
        }
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            return (<span>{numberFormat(row.original.amount)}</span>)
        }
    },
    {
        accessorKey: "order.invoice_no",
        header: "Invoice No",
        cell: ({ row }) => (
            <Link
                href={route("pos.invoice", row.original.order?.id)}
                className="text-cyan-500 hover:underline hover:underline-offset-4 hover:text-cyan-400"
            >
                #{row.original.order?.invoice_no}
            </Link>
        ),
    },
    {
        accessorKey: 'order.customer.name',
        header: 'Customer',
        cell: ({ row }) => {
            return (<span className="text-sm">{row.original.order?.customer?.name}</span>)
        }
    },
    {
        accessorKey: 'order.customer.contact',
        header: 'Contact',
        cell: ({ row }) => {
            return (<span className="text-sm">{row.original.order?.customer?.contact}</span>)
        }
    },
];

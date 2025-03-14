import DeleteAction from "@/components/actions/DeleteAction";
import { Expense } from "@/lib/interfaces";
import { dateTimeFormat, numberFormat } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

export const expensesColumns: ColumnDef<Expense>[] = [
    {
        accessorKey: "#",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                    {row.original.user.name[0]}
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
        accessorKey: "payment_method.name",
        header: "Account",
        cell: ({ row }) => {
            return <span>{row.original.payment_method.name}</span>;
        },
    },
    {
        accessorKey: "item",
        header: "Description",
        cell: ({ row }) => {
            return <span>{row.original.item}</span>;
        },
    },
    {
        accessorKey: "cost",
        header: "Cost",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.cost)}</span>;
        },
    },
    // user
    {
        accessorKey: "user.name",
        header: "User",
        cell: ({ row }) => {
            return <span className="text-sm">{row.original.user.name}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = usePage().props.auth.user;
            return (
                <div className="flex items-center gap-3">
                    {user.role == "admin" && (
                        <DeleteAction
                            url={"expenses.destroy"}
                            item={row.original}
                            label={"Expense"}
                        />
                    )}
                </div>
            );
        },
    },
];

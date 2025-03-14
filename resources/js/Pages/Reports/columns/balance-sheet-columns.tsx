import { Account } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const balanceSheetColumns: ColumnDef<Account>[] = [
    // branch
    // {
    //     accessorKey: "branch",
    //     header: "Branch",
    //     cell: ({ row }) => {
    //         return <span>{row.original.branch ?.name}</span>;
    //     },
    // },
    {
        accessorKey: "account",
        header: "Account",
        cell: ({ row }) => {
            return <span>{row.original.payment_method?.name}</span>;
        },
    },
    {
        accessorKey: "balance",
        header: "Balance",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.amount)}</span>;
        },
    },
    // last updated
    {
        accessorKey: "updated_at",
        header: "Last Used",
        cell: ({ row }) => {
            return <span className="text-sm text-muted-foreground">{dayjs(row.original.updated_at).fromNow()}</span>;
        },
    },
];

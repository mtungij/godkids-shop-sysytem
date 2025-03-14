import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export interface UserSalesByAccount {
    id: number;
    name: string;
    account: string;
    total_sales: number;
    total_profit: number;
    total_credit_collections: number;
}

export const userSalesByAccountColumns: ColumnDef<UserSalesByAccount>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "account",
        header: "Account",
    },
    {
        accessorKey: "total_sales",
        header: "Total Sales",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.total_sales)}</div>;
        },
    },
    {
        accessorKey: "total_profit",
        header: "Total Profit",
        cell: ({ row }) => {
            return <div>{numberFormat(row.original.total_profit)}</div>;
        },
    },
];

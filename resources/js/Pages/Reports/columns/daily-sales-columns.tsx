import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export interface DailySale {
    day: string;
    sales: number;
    profit: number;
}

export const DailySalesColumns: ColumnDef<DailySale>[] = [
    {
        accessorKey: "day",
        header: "Date",
    },
    {
        accessorKey: "sales",
        header: "Sales",
        cell: ({ row }) => {
            const value = row.original.sales;
            return <p>{numberFormat(value)}</p>;
        },
    },
    {
        accessorKey: "profit",
        header: "Profit",
        cell: ({ row }) => {
            const value = row.original.profit;
            return <p>{numberFormat(value)}</p>;
        },
    },
];

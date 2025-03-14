import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export interface UserSale {
    name: string;
    sales: number;
    profit: number;
    expenses: number;
    credit_collections: number;
}

export const userSalesColumns: ColumnDef<UserSale>[] = [
    {
        accessorKey: "name",
        header: "User",
    },
    {
        accessorKey: "expenses",
        header: "Expenses",
        cell: ({ row }) => {
            const amount = row.original.expenses;
            return <div className="text-sm">{numberFormat(amount)}</div>;
        },
    },
    {
        accessorKey: "sales",
        header: "Sales",
        cell: ({ row }) => {
            const amount = row.original.sales;
            return <div className="text-sm">{numberFormat(amount)}</div>;
        },
    },
    // Net sales(sales - expenses)
    {
        accessorKey: "netSales",
        header: "Net Sales",
        cell: ({ row }) => {
            const amount =
                Number(row.original.sales) - Number(row.original.expenses);
            return (
                <div className="text-sm text-muted-foreground">{numberFormat(amount)}</div>
            );
        },
    },
    {
        accessorKey: "profit",
        header: "Profit",
        cell: ({ row }) => {
            const amount = row.original.profit;
            return <div className="text-sm">{numberFormat(amount)}</div>;
        },
    },
    // Net profit(profit - expenses)
    {
        accessorKey: "netProfit",
        header: "Net Profit",
        cell: ({ row }) => {
            const amount =
                Number(row.original.profit) - Number(row.original.expenses);
            return (
                <div className="text-sm text-muted-foreground">
                    {numberFormat(amount)}
                </div>
            );
        },
    },
    {
        accessorKey: "credit_collections",
        header: "Credit Collections",
        cell: ({ row }) => {
            const amount = row.original.credit_collections;
            return <div className="text-sm">{numberFormat(amount)}</div>;
        },
    }
];

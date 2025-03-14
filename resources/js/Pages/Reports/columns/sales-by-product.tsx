import { Product } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const salesByProuctColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Product",
    },
    {
        accessorKey: "order_items_sum_qty",
        header: "Qty",
        cell: ({ row }) => {
            return (
                <span className="">
                    {numberFormat(row.original.order_items_sum_qty)}
                </span>
            );
        }
    },
    {
        accessorKey: "order_items_sum_total",
        header: "Total sales",
        cell: ({ row }) => {
            return (
                <span className="">
                    {numberFormat(row.original.order_items_sum_total)}
                </span>
            );
        }
    },
    {
        accessorKey: "order_items_sum_profit",
        header: "Profit",
        cell: ({ row }) => {
            return (
                <span className="">
                    {numberFormat(row.original.order_items_sum_profit)}
                </span>
            );
        },
    }
]
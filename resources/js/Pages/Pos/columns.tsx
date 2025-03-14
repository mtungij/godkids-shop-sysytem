import { OrderItem } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const invoiceItemColumns: ColumnDef<OrderItem>[] = [
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => {
            return <span>{row.original?.product?.name}</span>;
        },
    },
    {
        accessorKey: "qty",
        header: "Qty",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.qty)}</span>;
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.price)}</span>;
        }
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            return <span>{numberFormat(row.original.total)}</span>;
        },
    }
];

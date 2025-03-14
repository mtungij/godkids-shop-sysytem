import DangerBadge from "@/components/badges/danger-badge";
import SuccessBadge from "@/components/badges/success-badge";
import { Product } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import EditProduct from "./actions/edit-product";
import DeleteAction from "@/components/actions/DeleteAction";
import { usePage } from "@inertiajs/react";

export const productColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "#",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                    {row.original?.name[0]}
                </span>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return <span>{row.original?.name}</span>;
        },
    },
    {
        accessorKey: "unit",
        header: "Unit",
        cell: ({ row }) => {
            return (<span className="text-cyan-500">{ row.original.unit}</span>)
        }
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-right">Stock</div>,
        cell: ({ row }) => {
            const stock = row.original.stock;
            const stock_alert = row.original.stock_alert;
            return (
                <div className="w-full flex justify-end">
                    {stock > stock_alert ? (
                        <SuccessBadge label={numberFormat(stock)} />
                    ) : (
                        <DangerBadge label={numberFormat(stock)} />
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "buy_price",
        header: () => <div className="text-right">Buy price</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    {numberFormat(row.original.buy_price)}
                </div>
            );
        },
    },
    {
        accessorKey: "sell_price",
        header: () => <div className="text-right">Sell price</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    {numberFormat(row.original.sell_price)}
                </div>
            );
        },
    },
    // whole price
    {
        accessorKey: "whole_price",
        header: () => <div className="text-right">Whole price</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    {numberFormat(row.original.whole_price)}
                </div>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = usePage().props.auth.user;
            return (
                <div className="flex items-center gap-2">
                    {user.role == "admin" && (
                        <>
                            <EditProduct product={row.original} />
                            <DeleteAction
                                url="products.destroy"
                                item={row.original}
                                label={row.original.name}
                            />
                        </>
                    )}
                </div>
            );
        },
    },
];

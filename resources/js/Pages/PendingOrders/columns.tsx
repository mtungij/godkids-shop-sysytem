import { Order, OrderItem } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import EditPendingOrderItems from "./actions/edit-pending-order-items";
import EditPendingItem from "./actions/EditPendingItem";
import { Button } from "@/components/ui/button";
import { Check, Edit } from "lucide-react";

export const pendingOrderColumns: ColumnDef<Order>[] = [
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
        accessorKey: "total_pending_qty",
        header: "Total",
        cell: ({ row }) => (
            <div className="">
                {numberFormat(row.original.order_items_sum_total_pending_qty)}
            </div>
        ),
    },
    {
        accessorKey: "payment_method.name",
        header: "Account",
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                {row.original.payment_method?.name}
            </div>
        ),
    },
    // order date
    {
        accessorKey: "order_date",
        header: "Order Date",
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                {dayjs(row.original.created_at).fromNow()}
            </div>
        ),
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const order = row.original;
            return (
                <div className="flex gap-x-2">
                    <Button
                        size={"icon"}
                        onClick={() => {
                            if (confirm("Confirm all the products now?"))
                                router.patch(
                                    route(
                                        "orders.pendingOrders.confirm-all",
                                        order.id
                                    )
                                );
                        }}
                    >
                        <Check className="size-5" />
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            router.visit(
                                route("orders.pendingOrders.edit", order.id)
                            )
                        }
                    >
                        <Edit className="size-5 mr-1" />
                        Edit
                    </Button>
                </div>
            );
        },
    },
];

export const editPendingOrderItemsColumns: ColumnDef<OrderItem>[] = [
    {
        accessorKey: "product.name",
        header: "Product",
        cell: ({ row }) => (
            <div className="font-medium">{row.original.product?.name}</div>
        ),
    },
    {
        accessorKey: "qty",
        header: "Sold",
        cell: ({ row }) => <EditPendingItem item={row.original} />,
    },
    {
        accessorKey: "pending_qty",
        header: "Pending",
        cell: ({ row }) => (
            <div className="">{numberFormat(row.original.pending_qty)}</div>
        ),
    },
    // balance pending qty
    {
        accessorKey: "balance_pending_qty",
        header: "Balance",
        cell: ({ row }) => (
            <div className="">
                {numberFormat(row.original.balance_pending_qty)}
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
            <div className="">{numberFormat(row.original.price)}</div>
        ),
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
            <div className="">{numberFormat(row.original.total)}</div>
        ),
    },
];

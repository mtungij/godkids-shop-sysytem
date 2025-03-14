import { PaymentMethod } from "@/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import EditPaymentMethodAction from "./actions/edit-payment-method";
import DeleteAction from "@/components/actions/DeleteAction";
import { numberFormat } from "@/lib/utils";

export const paymentMethodColumns: ColumnDef<PaymentMethod>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                    {row.original.name[0]}
                </span>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "accounts_sum_amount",
        header: "Balance",
        cell: ({ row }) => {
            return <span className="text-green-500">{numberFormat(row.original.accounts_sum_amount)}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex gap-x-2">
                    <EditPaymentMethodAction paymentMethod={row.original} />
                    <DeleteAction
                        item={row.original}
                        url="paymentMethods.destroy"
                        label="Payment Method"
                    />
                </div>
            );
        },
    },
];

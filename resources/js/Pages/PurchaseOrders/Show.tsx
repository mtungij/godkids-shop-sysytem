import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PurchaseOrder } from "@/lib/interfaces";
import { Head, usePage } from "@inertiajs/react";
import { purchaseOrderItemsColumns } from "./columns";
import { dateTimeFormat, numberFormat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function Show({
    purchaseOrder,
}: {
    purchaseOrder: PurchaseOrder;
}) {
    const user = usePage().props.auth.user;
    return (
        <Authenticated
            header={
                <h2 className="page-head">
                    Purchase Order{" "}
                    <span className="text-cyan-500">
                        {purchaseOrder.reference}
                    </span>
                </h2>
            }
        >
            <Head title="Purchase Order" />

            <section className="p-4 my-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md print:shadow-none print:p-0">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {user.company.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.company.address}
                    </p>
                    {/* da<p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.company.}
                    </p>te creared */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Created on {dateTimeFormat(purchaseOrder.created_at)}
                    </p>
                </div>

                <h3 className="text-lg font-semibold uppercase text-center mb-3 text-gray-800 dark:text-gray-200 mt-6">
                    Purchase order to <span className="text-cyan-500">{user.company?.name}</span>
                </h3>

                <div>
                    <DataTable columns={purchaseOrderItemsColumns} data={purchaseOrder.items} />        
                </div>
                
                <div className="flex justify-between mt-6">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">Total:</span> {numberFormat(purchaseOrder.items_sum_total_buy_price)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">Account:</span> {purchaseOrder.payment_method.name}
                        </p>
                    </div>
                </div>
                {/* reference */}
                <div className="mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Reference:</span> {purchaseOrder.reference}
                    </p>
                </div>
                {/*  isssued by */}
                <div className="mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold italic">Issued by:</span> {user.name}
                    </p>
                </div>

                {/* print button */}
                <div className="mt-6 flex justify-center print:hidden">
                    <Button onClick={() => window.print()}>
                        <Printer />
                        Print</Button>
                </div>
            </section>
        </Authenticated>
    );
}

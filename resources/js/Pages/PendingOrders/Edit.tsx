import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Order } from "@/lib/interfaces";
import { Head, router } from "@inertiajs/react";
import { editPendingOrderItemsColumns } from "./columns";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Edit({ order }: { order: Order }) {
    return (
        <Authenticated
            header={
                <h2 className="page-head">
                    Edit Pending Order{" "}
                    <span className="text-cyan-500">#{order.invoice_no}</span>
                </h2>
            }
        >
            <Head title={`Edit pending order ${order.invoice_no}`} />

            <section className="space-y-4 mb-8 mt-4">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Edit Order
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Edit the order details below.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800">
                    <DataTable
                        columns={editPendingOrderItemsColumns}
                        data={order.order_items}
                    />

                    {/* <br />

<ul className="mt-3 flex flex-col">
  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
    <div className="flex items-center justify-between w-full">
      <span>Payment to Front</span>
      <span>$264.00</span>
    </div>
  </li>
  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
    <div className="flex items-center justify-between w-full">
      <span>Tax fee</span>
      <span>$52.8</span>
    </div>
  </li>
  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
    <div className="flex items-center justify-between w-full">
      <span>Amount paid</span>
      <span>$316.8</span>
    </div>
  </li>
</ul> */}
                </div>
                <div className="my-4 p-4 flex gap-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" onClick={() => router.patch(route("orders.pendingOrders.cancel", order.id))}>
                        <X className="size-4" />
                        Cancel order
                    </Button>
                    <Button onClick={() => router.patch(route("orders.pendingOrders.confirm", order.id))}>
                        <Check className="size-4" />
                        Confirm order
                    </Button>
                </div>
            </section>
        </Authenticated>
    );
}

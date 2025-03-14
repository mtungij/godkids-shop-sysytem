import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import TableWrapper from "@/components/table-wrapper";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PurchaseOrders } from "@/lib/interfaces";
import { Deferred, Head, router } from "@inertiajs/react";
import React from "react";
import { purchaseOrdersColumns } from "./columns";
import Pagination from "@/components/pagination";
import TableTopHeader from "@/components/TableTopHeader";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function Index({
    purchaseOrders,
}: {
    purchaseOrders: PurchaseOrders;
}) {
    return (
        <Authenticated header={<h2 className="page-head">Purchase Orders</h2>}>
            <Head title="Purchase Orders" />

            <section className="my-6">
                <TableWrapper>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Purchase Orders
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Purchase orders for all branches
                            </p>
                        </div>
                        <div>
                            <div className="inline-flex gap-x-2">
                                <Button
                                    onClick={() =>
                                        router.visit(route("purchases.create"))
                                    }
                                >
                                    <PlusCircleIcon className="size-5 mr-1" />
                                    Make purchase
                                </Button>
                            </div>
                        </div>
                    </div>
                    <TableTopHeader url={route("purchases.index")} />
                    <Deferred
                        data={"purchaseOrders"}
                        fallback={<TableSkeleton columns={4} rows={8} />}
                    >
                        <>
                            <DataTable
                                columns={purchaseOrdersColumns}
                                data={purchaseOrders?.data}
                            />
                            <Pagination data={purchaseOrders} />
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
}

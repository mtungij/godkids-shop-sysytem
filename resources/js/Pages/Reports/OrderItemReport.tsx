import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import TableTopHeader from "@/components/TableTopHeader";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { OrderItem } from "@/lib/interfaces";
import { Deferred, Head } from "@inertiajs/react";
import { orderItemColumns } from "./columns/order-items";
import TableWrapper from "@/components/table-wrapper";

const OrderItemReport = ({ orderItems }: { orderItems: OrderItem[] }) => {
    return (
        <Authenticated
            header={<h2 className="page-head">Products sales Report</h2>}
        >
            <Head title="Order Items" />

            <section className="mt-4 mb-20">
                <TableWrapper>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Order Items Report
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Detailed report of products sold
                            </p>
                        </div>
                        <div>
                            <div className="inline-flex gap-x-2">..</div>
                        </div>
                    </div>
                    <TableTopHeader url={route("reports.order-items")} />
                    <Deferred
                        data={"orderItems"}
                        fallback={<TableSkeleton columns={4} rows={8} />}
                    >
                        <>
                            <DataTable
                                columns={orderItemColumns}
                                data={orderItems}
                            />
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
};

export default OrderItemReport;

import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import TableWrapper from "@/components/table-wrapper";
import TableTopHeader from "@/components/TableTopHeader";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Orders } from "@/lib/interfaces";
import { Deferred, Head } from "@inertiajs/react";
import { creditOrderColumns } from "./columns";
import Pagination from "@/components/pagination";
import UserTab from "@/components/user-tab";
import { ListFilter, BookmarkX, ListCollapse } from "lucide-react";

export default function Index({ orders }: { orders: Orders }) {
    return (
        <Authenticated
            header={
                <nav className="flex items-center gap-3 overflow-x-auto scroll-bar whitespace-nowrap">
                    <UserTab
                        href={route("orders.index")}
                        label="All Orders"
                        icon={<ListFilter className="size-4" />}
                    />
                    <UserTab
                        href={route("orders.pendingOrders")}
                        label="Pending"
                        icon={<BookmarkX className="size-4" />}
                    />
                    <UserTab
                        href={route("orders.creditOrders")}
                        label="Credits"
                        icon={<ListCollapse className="size-4" />}
                    />
                </nav>
            }
        >
            <Head title="Credit Orders" />

            <section className="my-6">
                <TableWrapper>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Credit Orders
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                These orders are specific to the branch you're currently in.
                            </p>
                        </div>
                        <div>
                            <div className="inline-flex gap-x-2">
                                {/* <CreateProduct /> */}
                            </div>
                        </div>
                    </div>
                    <TableTopHeader url={route("orders.creditOrders")} />
                    <Deferred
                        data={["orders", 'paymentMethods']}
                        fallback={<TableSkeleton columns={5} rows={8} />}
                    >
                        <>
                            <DataTable
                                columns={creditOrderColumns}
                                data={orders?.data}
                            />
                            <Pagination data={orders} />
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
}

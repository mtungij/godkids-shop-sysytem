import TableSkeleton from "@/components/skeletons/TableSkeleton";
import TableWrapper from "@/components/table-wrapper";
import { PaymentMethod, PaymentMethods } from "@/lib/interfaces";
import { Deferred, Head } from "@inertiajs/react";
import { paymentMethodColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import CreatePaymentMethod from "./actions/create-payment-method";

export default function Index({
    paymentMethods,
}: {
    paymentMethods: PaymentMethod[];
}) {
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Payment Methods
                </h2>
            }
        >
            <Head title="Payment Methods" />

            <section className="my-6">
                <TableWrapper>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Payment Methods
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                These payments will be available to all branches
                            </p>
                        </div>
                        <div>
                            <div className="inline-flex gap-x-2">
                                {/* <a
                                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                                href="#"
                                            >
                                                View all
                                            </a> */}
                                <CreatePaymentMethod />
                            </div>
                        </div>
                    </div>
                    <Deferred
                        data={"paymentMethods"}
                        fallback={<TableSkeleton columns={2} rows={6} />}
                    >
                        <>
                            <DataTable
                                columns={paymentMethodColumns}
                                data={paymentMethods}
                            />
                            {/* <Pagination data={paymentMethods} /> */}
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
}

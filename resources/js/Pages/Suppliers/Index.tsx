import { DataTable } from '@/components/data-table'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import TableWrapper from '@/components/table-wrapper'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Supplier } from '@/lib/interfaces'
import { Deferred, Head } from '@inertiajs/react'
import React from 'react'
import { suppliersColumns } from './columns'
import CreateSupplier from './actions/create-supplier'

export default function Index({ suppliers}: { suppliers: Supplier[] }) {
  return (
    <Authenticated header={<h2 className="page-head">Suppliers</h2>}>
        <Head title="Suppliers" />

        <section className="my-6">
                <TableWrapper>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Company Suppliers
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                All suppliers in the company
                            </p>
                        </div>
                        <div>
                            <div className="inline-flex gap-x-2">
                                <CreateSupplier />
                            </div>
                        </div>
                    </div>
                    <Deferred
                        data={"suppliers"}
                        fallback={<TableSkeleton columns={2} rows={6} />}
                    >
                        <>
                            <DataTable
                                columns={suppliersColumns}
                                data={suppliers}
                            />
                            {/* <Pagination data={paymentMethods} /> */}
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
    </Authenticated>
  )
}

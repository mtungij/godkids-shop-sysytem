import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Products } from "@/lib/interfaces";
import { Deferred, Head, usePage } from "@inertiajs/react";
import { productColumns } from "./columns";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import TableWrapper from "@/components/table-wrapper";
import Pagination from "@/components/pagination";
import CreateProduct from "./actions/create-product";
import TableTopHeader from "@/components/TableTopHeader";
import { TableCell, TableHead } from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";

export default function Index({
    products,
    capital,
    sales,
}: {
    products: Products;
    capital: number;
    sales: number;
}) {
    const currentBranch = usePage().props.auth.user.branch;
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <section className="my-6">
                <TableWrapper>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                <span className="text-green-500">
                                    {currentBranch.name}
                                </span>{" "}
                                products
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                These products are specific to the branch you're
                                currently in.
                            </p>
                        </div>
                        <div>
                            <div className="inline-flex gap-x-2">
                                <CreateProduct />
                            </div>
                        </div>
                    </div>
                    <TableTopHeader url={route("products.index")} />
                    <Deferred
                        data={["products", "capital", "sales"]}
                        fallback={<TableSkeleton columns={4} rows={8} />}
                    >
                        <>
                            <DataTable
                                columns={productColumns}
                                data={products?.data}
                                footer={
                                    <>
                                        <TableHead>Totals</TableHead>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="text-right text-green-500">
                                            {numberFormat(capital)}
                                        </TableCell>
                                        <TableCell className="text-right text-green-500">
                                            {numberFormat(sales)}
                                        </TableCell>
                                    </>
                                }
                            />
                            <Pagination data={products} />
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
}

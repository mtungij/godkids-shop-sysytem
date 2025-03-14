import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Product } from "@/lib/interfaces";
import { Deferred, Head } from "@inertiajs/react";
import { salesByProuctColumns } from "./columns/sales-by-product";
import TableWrapper from "@/components/table-wrapper";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { DateRangePicker } from "@/components/DatePicker";
import { TableCell, TableHead } from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";

const SalesByProuct = ({
    products,
    startDate,
    endDate,
}: {
    products: Product[];
    startDate: string;
    endDate: string;
}) => {
    const totalSales = products?.reduce((acc, product) => {
        return acc + Number(product?.order_items_sum_total);
    }, 0);

    const totalProfit = products?.reduce((acc, product) => {
        return acc + Number(product?.order_items_sum_profit);
    }, 0);

    return (
        <Authenticated header={<h2 className="page-head">Sales by product</h2>}>
            <Head title="Sales by product" />

            <section className="mt-4 mb-20">
                <TableWrapper>
                    <div className="space-y-2 p-4">
                        <div className="flex items-center gap-3">
                            <p>Date</p>
                            <p className="text-sm bg-green-500/30 p-0.5">
                                {" "}
                                {startDate} - {endDate}
                            </p>
                        </div>

                        <div>
                            <DateRangePicker
                                from={startDate}
                                to={endDate}
                                url="/reports/sales-by-product"
                                downloadPdfUrl="/reports/sales-by-product/export-pdf"
                                downloadExcelUrl="/reports/sales-by-product/export-excel"
                            />
                        </div>
                    </div>
                    <Deferred
                        data="products"
                        fallback={<TableSkeleton columns={3} rows={10} />}
                    >
                        <DataTable
                            columns={salesByProuctColumns}
                            data={products}
                            footer={
                                <>
                                    <TableHead>Totals</TableHead>
                                    <TableCell></TableCell>
                                    <TableCell className="text-green-500">
                                        {numberFormat(totalSales)}
                                    </TableCell>
                                    <TableCell className="text-green-500">
                                        {numberFormat(totalProfit)}
                                    </TableCell>
                                </>
                            }
                        />
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
};

export default SalesByProuct;

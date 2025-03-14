import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head } from "@inertiajs/react";
import TableWrapper from "@/components/table-wrapper";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { DateRangePicker } from "@/components/DatePicker";
import { TableCell, TableHead } from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";
import { DailySale, DailySalesColumns } from "./columns/daily-sales-columns";

const DailySales = ({
    dailySales,
    startDate,
    endDate,
}: {
    dailySales: DailySale[];
    startDate: string;
    endDate: string;
}) => {
    const totalSales = dailySales?.reduce((acc, item) => {
        return acc + Number(item?.sales);
    }, 0);

    const totalProfit = dailySales?.reduce((acc, item) => {
        return acc + Number(item?.profit);
    }, 0);

    return (
        <Authenticated header={<h2 className="page-head">Daily Sales</h2>}>
            <Head title="Daily Sales" />

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
                                url="/reports/daily-sales"
                                downloadPdfUrl="/reports/daily-sales/export-pdf"
                                downloadExcelUrl="/reports/daily-sales/export-excel"
                            />
                        </div>
                    </div>
                    <Deferred
                        data="dailySales"
                        fallback={<TableSkeleton columns={3} rows={10} />}
                    >
                        <DataTable
                            columns={DailySalesColumns}
                            data={dailySales}
                            footer={
                                <>
                                    <TableHead>Totals</TableHead>
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

export default DailySales;

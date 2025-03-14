import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head } from "@inertiajs/react";
import TableWrapper from "@/components/table-wrapper";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { DateRangePicker } from "@/components/DatePicker";
import { TableCell, TableHead } from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";
import { BranchSale, branchSalesColumns } from "./columns/branch-sales-columns";

const branchSalesReport = ({
    branches,
    startDate,
    endDate,
}: {
    branches: BranchSale[];
    startDate: string;
    endDate: string;
}) => {
    const totalSales = branches?.reduce((acc, item) => {
        return acc + Number(item?.sales);
    }, 0);

    const totalProfit = branches?.reduce((acc, item) => {
        return acc + Number(item?.profit);
    }, 0);

    return (
        <Authenticated header={<h2 className="page-head">Branches Sales Report</h2>}>
            <Head title="Branches Sales Report" />

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
                                url="/reports/branch-sales"
                                downloadPdfUrl="/reports/branch-sales/export-pdf"
                                downloadExcelUrl="/reports/branch-sales/export-excel"
                            />
                        </div>
                    </div>
                    <Deferred
                        data="branches"
                        fallback={<TableSkeleton columns={3} rows={10} />}
                    >
                        <DataTable
                            columns={branchSalesColumns}
                            data={branches}
                            footer={
                                <>
                                    <TableHead>Totals</TableHead>
                                    <TableCell></TableCell>
                                    <TableCell className="text-green-500">
                                        {numberFormat(totalSales)}
                                    </TableCell>
                                    <TableCell></TableCell>
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

export default branchSalesReport;

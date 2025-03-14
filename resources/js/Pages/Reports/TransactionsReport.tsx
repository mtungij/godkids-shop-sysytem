import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head } from "@inertiajs/react";
import TableWrapper from "@/components/table-wrapper";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { DateRangePicker } from "@/components/DatePicker";
import { userTransactionColumns } from "../Users/columns";
import { Transaction } from "@/lib/interfaces";
import { transactionColumns } from "./columns/transactions-columns";

const TransactionsPage = ({
    transactions,
    startDate,
    endDate,
}: {
    transactions: Transaction[];
    startDate: string;
    endDate: string;
}) => {
    return (
        <Authenticated
            header={<h2 className="page-head">Transactions Report</h2>}
        >
            <Head title="Transactions Report" />

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
                                url="/reports/transactions"
                                downloadPdfUrl="/reports/transactions/export-pdf"
                                downloadExcelUrl="/reports/transactions/export-excel"
                            />
                        </div>
                    </div>
                    <Deferred
                        data="transactions"
                        fallback={<TableSkeleton columns={3} rows={10} />}
                    >
                        <DataTable
                            columns={transactionColumns}
                            data={transactions}
                        />
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
};

export default TransactionsPage;

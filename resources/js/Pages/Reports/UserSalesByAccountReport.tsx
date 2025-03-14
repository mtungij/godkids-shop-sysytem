import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head } from "@inertiajs/react";
import TableWrapper from "@/components/table-wrapper";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { DateRangePicker } from "@/components/DatePicker";
import { userTransactionColumns } from "../Users/columns";
import { Transaction } from "@/lib/interfaces";
import { UserSalesByAccount, userSalesByAccountColumns } from "./columns/user-sales-by-account-columns";

const UserSalesByAccountReport = ({
    userSales,
    startDate,
    endDate,
}: {
    userSales: UserSalesByAccount[];
    startDate: string;
    endDate: string;
}) => {
    return (
        <Authenticated
            header={<h2 className="page-head">User Sales By Account</h2>}
        >
            <Head title="user sales by account Report" />

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
                                url="/reports/account-user-sales"
                                downloadPdfUrl="/reports/account-user-sales/export-pdf"
                                downloadExcelUrl="/reports/account-user-sales/export-excel"
                            />
                        </div>
                    </div>
                    <Deferred
                        data="userSales"
                        fallback={<TableSkeleton columns={3} rows={10} />}
                    >
                        <DataTable
                            columns={userSalesByAccountColumns}
                            data={userSales}
                        />
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
};

export default UserSalesByAccountReport

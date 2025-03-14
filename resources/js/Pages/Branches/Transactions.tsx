import { DataTable } from "@/components/data-table";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head, Link } from "@inertiajs/react";
import { Fragment } from "react";
import { Transactions } from "@/lib/interfaces";
import { Branch } from "@/types";
import { transactionColumns } from "../Reports/columns/transactions-columns";

const TransactionsPage = ({
    transactions,
    branch,
}: {
    transactions: Transactions;
    branch: Branch;
}) => {
    return (
        <Authenticated
            header={
                <h2 className="page-head">{branch.name} Transactions</h2>
            }
        >
            <Head title={`${branch.name} Transactions`} />

            <section className="p-4">
                <div>
                    <Deferred
                        data={"transactions"}
                        fallback={<TableSkeleton columns={4} rows={10} />}
                    >
                        <Fragment>
                            <DataTable
                                columns={transactionColumns}
                                data={transactions?.data}
                            />
                            <Pagination data={transactions} />
                        </Fragment>
                    </Deferred>
                </div>
            </section>
        </Authenticated>
    );
};

export default TransactionsPage;

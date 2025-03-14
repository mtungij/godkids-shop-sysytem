import ReportsCard from "@/components/reports-card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Reports() {
    return (
        <Authenticated>
            <Head title="Reports" />

            <section className="p-4">
                <h1 className="text-2xl font-bold">Reports</h1>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ReportsCard
                        link={route("reports.order-items")}
                        title="Sold Items"
                        description="Indetails"
                    />
                    <ReportsCard
                        link={route("reports.sales-by-product")}
                        title="Sales by product"
                        description="Sales of each product"
                    />
                    <ReportsCard
                        link={route("reports.daily-sales")}
                        title="Daily Sales"
                        description="sales per each day"
                    />
                    <ReportsCard
                        link={route("reports.branch-sales")}
                        title="Branch Sales"
                        description="Sales & expenses per branch"
                    />
                    <ReportsCard
                        link={route("reports.user-sales")}
                        title="User Sales"
                        description="Revenues & expenses per user"
                    />

                    <ReportsCard
                        link={route("reports.account-user-sales")}
                        title="User Sales by Account"
                        description="total user sales per account"
                    />

                    <ReportsCard
                        link={route("reports.balance-sheet")}
                        title="Balance Sheet"
                        description="Account balances"
                    />
                    <ReportsCard
                        link={route("reports.transactions")}
                        title="Accounts transactions"
                        description="all account transactions"
                    />
                </div>
            </section>
        </Authenticated>
    );
}

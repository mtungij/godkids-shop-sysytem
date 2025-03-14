import Spinner from "@/components/Spinner";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Expense, PaymentMethod } from "@/lib/interfaces";
import { Deferred, Head } from "@inertiajs/react";
import CreateExpense from "./actions/create-expense";
import { DataTable } from "@/components/data-table";
import { expensesColumns } from "./columns";

export default function Index({ expenses, paymentMethods }: { expenses: Expense[], paymentMethods: PaymentMethod[] }) {
    return (
        <Authenticated
            header={<h2 className="page-head">Expenses</h2>}
        >
            <Head title="Expenses" />

            <section className="p-4 rounded-md shadow-md bg-white dark:bg-transparent my-6">
                <Deferred data={'paymentMethods'} fallback={<Spinner />}>
                    <CreateExpense paymentMethods={paymentMethods} />
                </Deferred>

                <Deferred data={'expenses'} fallback={<Spinner />}>
                    <DataTable columns={expensesColumns} data={expenses} />
                </Deferred>
            </section>
        </Authenticated>
    );
}

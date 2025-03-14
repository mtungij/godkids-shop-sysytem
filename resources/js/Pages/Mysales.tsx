import { DataTable } from "@/components/data-table";
import Spinner from "@/components/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { OrderItems } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { Deferred, Head } from "@inertiajs/react";
import { orderItemColumns } from "./Reports/columns/order-items";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { userOrderItemColumns } from "./columns";
import Pagination from "@/components/pagination";

interface Props {
    revenue: number;
    expenses: number;
    creditSales: number;
    creditCollections: number;
}

const Mysales = ({ sales, items }: { sales: Props; items: OrderItems }) => {
    console.log(items);

    return (
        <Authenticated header={<h2 className="page-haed">My sales today</h2>}>
            <Head title="My dashboard" />

            <section className="p-4 space-y-6">
                <Deferred data={"sales"} fallback={<Spinner />}>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Paid Sales</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {numberFormat(sales?.revenue)}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Expenses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {numberFormat(sales?.expenses)}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Credit Collections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {numberFormat(sales?.creditCollections)}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Credit Sales</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {numberFormat(sales?.creditSales)}
                            </CardContent>
                        </Card>
                    </div>
                </Deferred>

                <Deferred data={"items"} fallback={<TableSkeleton columns={4} rows={10} />}>
                    <>
                        <DataTable columns={userOrderItemColumns} data={items?.data} />
                        <Pagination data={items} />
                    </>
                </Deferred>
            </section>
        </Authenticated>
    );
};

export default Mysales;

import { ProfitChart } from "@/components/dashboard/charts/ProfitChart";
import {
    chartData,
    SalesChart,
} from "@/components/dashboard/charts/SalesChart";
import MetricsList from "@/components/dashboard/MetricsList";
import { DataTable } from "@/components/data-table";
import { DateRangePicker } from "@/components/DatePicker";
import { ChartSkeleton } from "@/components/skeletons/ChartSkeleton";
import StatsCardSkeleton from "@/components/skeletons/StatsCartSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { StatsCardProps } from "@/components/StatsCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Products, TrendingProduct } from "@/lib/interfaces";
import { Deferred, Head } from "@inertiajs/react";
import { emptyStockColumns, trendingProductColumns } from "./columns";

export default function Dashboard({
    statsData,
    stocksData,
    emptyStocks,
    trendingProducts,
    monthlySales,
    monthlyProfit,
    startDate,
    endDate,
}: {
    statsData: StatsCardProps[];
    stocksData: StatsCardProps[];
    emptyStocks: Products,
    trendingProducts: TrendingProduct[],
    monthlySales: chartData[];
    monthlyProfit: chartData[];
    startDate: string;
    endDate: string;
}) {
    return (
        <AuthenticatedLayout header={<h2 className="page-head">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="px-4 ">
                <DateRangePicker
                    from={startDate}
                    to={endDate}
                    url="/dashboard"
                />
            </div>
            <div className="py-6 space-y-6 px-4">
                <Deferred
                    data={"statsData"}
                    fallback={<StatsCardSkeleton columns={4} />}
                >
                    <MetricsList statsData={statsData} />
                </Deferred>

                <Deferred
                    data={"stocksData"}
                    fallback={<StatsCardSkeleton columns={4} />}
                >
                    <MetricsList statsData={stocksData} />
                </Deferred>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Deferred
                        data={"monthlySales"}
                        fallback={<ChartSkeleton />}
                    >
                        <SalesChart chartData={monthlySales} />
                    </Deferred>

                    <Deferred
                        data={"monthlyProfit"}
                        fallback={<ChartSkeleton />}
                    >
                        <ProfitChart chartData={monthlyProfit} />
                    </Deferred>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Deferred
                        data={"emptyStocks"}
                        fallback={<TableSkeleton rows={4} columns={3} />}
                    >
                        <div className="bg-transparent p-2 grid gap-2">
                            <h5 className="text-lg font-bold dark:text-gray-300">Empty Stocks</h5>
                            <DataTable columns={emptyStockColumns}  data={emptyStocks?.data}  />
                        </div>
                    </Deferred>


                    <Deferred
                        data={"trendingProducts"}
                        fallback={<TableSkeleton rows={4} columns={3} />}
                    >
                        <div className="bg-transparent p-2 grid gap-2">
                          <h5 className="text-lg font-bold dark:text-gray-300">Trending Products</h5>
                          <DataTable columns={trendingProductColumns}  data={trendingProducts}  />
                        </div>
                    </Deferred>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

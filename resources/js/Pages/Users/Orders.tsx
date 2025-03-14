import { DataTable } from "@/components/data-table";
import Pagination from "@/components/pagination";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head, Link } from "@inertiajs/react";
import { Fragment } from "react";
import { userTransactionColumns } from "./columns";
import { Orders, Transactions } from "@/lib/interfaces";
import { User } from "@/types";
import UserTab from "@/components/user-tab";
import {
    LandmarkIcon,
    ListCheck,
    ShoppingBasket,
    TrafficCone,
} from "lucide-react";
import { orderColumns } from "../Orders/columns";
import UserTabs from "@/Utils/UserTabs";

const OrdersPage = ({ orders, user }: { orders: Orders; user: User }) => {
    return (
        <Authenticated
            header={
                <UserTabs user={user} />
            }
        >
            <Head title={`${user.name} orders`} />

            <section className="p-4">
                <div>
                    <Deferred
                        data={"orders"}
                        fallback={<TableSkeleton columns={4} rows={10} />}
                    >
                        <Fragment>
                            <DataTable
                                columns={orderColumns}
                                data={orders?.data}
                            />
                            <Pagination data={orders} />
                        </Fragment>
                    </Deferred>
                </div>
            </section>
        </Authenticated>
    );
};

export default OrdersPage;

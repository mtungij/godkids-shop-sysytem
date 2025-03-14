import TableSkeleton from "@/components/skeletons/TableSkeleton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Users } from "@/lib/interfaces";
import { Deferred, Head, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import CreateUser from "./actions/create-user";
import { Branch } from "@/types";
import DangerBadge from "@/components/badges/danger-badge";
import SuccessBadge from "@/components/badges/success-badge";
import Pagination from "@/components/pagination";
import DeleteAction from "@/components/actions/DeleteAction";
import UserCard from "@/components/user-profile";

const Index = ({ users, branches }: { users: Users; branches: Branch[] }) => {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    System users
                </h2>
            }
        >
            <Head title="Company users" />

            <section>
                {/* <!-- Table Section --> */}
                <div className="p-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
                    {/* <!-- Card --> */}
                    <div className="max-w-full overflow-hidden">
                        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm  dark:bg-gray-800 dark:border-gray-700">
                            {/* <!-- Header --> */}
                            <div className="p-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                        Users
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Add users, edit and more.
                                    </p>
                                </div>

                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <a
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                            href="#"
                                        >
                                            View all
                                        </a>

                                        <CreateUser branches={branches} />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Table --> */}
                            <div className="w-full overflow-auto scroll-bar py-4 bg-white dark:bg-gray-900">
                                <Deferred
                                    data={"users"}
                                    fallback={<TableSkeleton />}
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {users?.data.map((user) => (
                                            <UserCard
                                                key={user.id}
                                                id={user.id}
                                                name={user.name}
                                                phone={user.phone}
                                                email={user.email}
                                                branch={user.branch?.name}
                                                role={user.role}
                                                isActive={user.isActive}
                                                blockUser={true}
                                                sales_url={route('users.transactions', user.id)}
                                                tags={[
                                                    "expenses",
                                                    "seles",
                                                    "purchases",
                                                ]}
                                            />
                                        ))}
                                    </div>
                                </Deferred>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Card --> */}
                </div>
                {/* <!-- End Table Section --> */}
            </section>
        </Authenticated>
    );
};

export default Index;

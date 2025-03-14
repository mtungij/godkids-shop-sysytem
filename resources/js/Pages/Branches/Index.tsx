import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Branches } from "@/lib/interfaces";
import { Branch } from "@/types";
import { Deferred, Head } from "@inertiajs/react";
import React from "react";
import { branchColumns } from "./columns";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import CreateUser from "../Users/actions/create-user";
import TableWrapper from "@/components/table-wrapper";
import CreateBranchAction from "./actions/create-branch";
import Pagination from "@/components/pagination";

const Index = ({ branches }: { branches: Branches }) => {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Company Branches
                </h2>
            }
        >
            <Head title="Company Branches" />

            <section className="my-6">
                <TableWrapper>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Branches
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                All of the company branches
                            </p>
                        </div>

                        <div>
                            <div className="inline-flex gap-x-2">
                                {/* <a
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                            href="#"
                                        >
                                            View all
                                        </a> */}

                                <CreateBranchAction />
                            </div>
                        </div>
                    </div>

                    <Deferred data={"branches"} fallback={<TableSkeleton />}>
                        <>
                            <DataTable
                                columns={branchColumns}
                                data={branches?.data}
                            />
                            <Pagination data={branches} />
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
};

export default Index;

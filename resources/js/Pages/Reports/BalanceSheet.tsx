import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Deferred, Head } from "@inertiajs/react";
import TableWrapper from "@/components/table-wrapper";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Branch } from "@/types";
import React from "react";
import { numberFormat } from "@/lib/utils";
import dayjs from "dayjs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const BalanceSheetPage = ({ accounts }: { accounts: Branch[] }) => {
    console.log(accounts);

    return (
        <Authenticated header={<h2 className="page-head">Balance Sheet</h2>}>
            <Head title="Balance Sheet Report" />

            <section className="mt-4 mb-20">
                <div className="flex gap-4 items-center px-4 md:px-8 mb-4 justify-end">
                    <Button
                        variant={"outline"}
                        type="button"
                        title="downlad excel"
                        asChild
                    >
                        <a
                            href={route("reports.balance-sheet.export-excel")}
                            className="flex items-center gap-1"
                        >
                            <Download className="size-4" />
                            Excel
                        </a>
                    </Button>
                    <Button
                        variant={"outline"}
                        title="downlad pdf"
                        type="button"
                        asChild
                    >
                        <a
                            href={route("reports.balance-sheet.export-pdf")}
                            className="flex items-center gap-1"
                        >
                            <Printer className="size-4" />
                            PDF
                        </a>
                    </Button>
                </div>
                <TableWrapper>
                    <Deferred
                        data="accounts"
                        fallback={<TableSkeleton columns={3} rows={7} />}
                    >
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {/* <TableHead>Branch Name</TableHead> */}
                                        <TableHead>Account Name</TableHead>
                                        <TableHead className="text-right">
                                            Balance
                                        </TableHead>
                                        <TableHead>Last Used</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {accounts?.map((branch, branchIndex) => (
                                        <React.Fragment key={branchIndex}>
                                            <TableRow>
                                                <TableCell
                                                    rowSpan={
                                                        branch.accounts.length
                                                    }
                                                >
                                                    {branch.name}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        branch.accounts[0]
                                                            .payment_method.name
                                                    }
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {numberFormat(
                                                        branch.accounts[0]
                                                            .amount
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {dayjs(
                                                        branch.accounts[0]
                                                            .updated_at
                                                    ).fromNow()}
                                                </TableCell>
                                            </TableRow>
                                            {branch.accounts
                                                .slice(1)
                                                .map(
                                                    (account, accountIndex) => (
                                                        <TableRow
                                                            key={accountIndex}
                                                        >
                                                            <TableCell>
                                                                {
                                                                    account
                                                                        .payment_method
                                                                        .name
                                                                }
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {numberFormat(
                                                                    account.amount
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {dayjs(
                                                                    account.updated_at
                                                                ).fromNow()}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    </Deferred>
                </TableWrapper>
            </section>
        </Authenticated>
    );
};

export default BalanceSheetPage;

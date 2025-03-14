import { DataTable } from "@/components/data-table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Order } from "@/lib/interfaces";
import { dateFormat, numberFormat } from "@/lib/utils";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import { invoiceItemColumns } from "./columns";
import TableWrapper from "@/components/table-wrapper";
import { Printer } from "lucide-react";

const Invoice = ({ order }: { order: Order }) => {
    const company = usePage().props.auth.user?.company;
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Invoice #{order.invoice_no}
                </h2>
            }
        >
            <Head title={`Invoice #${order.invoice_no}`} />

            <section className="max-w-xl mx-auto my-4 print:max-w-full print:my-0">
                {/* <!-- Modal --> */}
                <div className="size-full  overflow-x-hidden overflow-y-auto pointer-events-none">
                    <div className=" ">
                        <div className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-gray-800">
                            <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-gray-950">
                                {/* <!-- Close Button --> */}
                                <div className="absolute top-2 end-2 print:hidden">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            window.print();
                                        }}
                                        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 focus:outline-none focus:bg-cyan-500/20 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <Printer className="size-4" />
                                    </button>
                                </div>
                                {/* <!-- End Close Button --> */}

                                {/* <!-- SVG Background Element --> */}
                                <figure className="absolute inset-x-0 bottom-0 -mb-px">
                                    <svg
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 1920 100.1"
                                    >
                                        <path
                                            fill="currentColor"
                                            className="fill-white dark:fill-gray-800"
                                            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                                        ></path>
                                    </svg>
                                </figure>
                                {/* <!-- End SVG Background Element --> */}
                            </div>

                            <div className="relative z-10 -mt-12">
                                {/* <!-- Icon --> */}
                                <span className="mx-auto flex justify-center items-center size-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                    <svg
                                        className="shrink-0 size-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                                        <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </span>
                                {/* <!-- End Icon --> */}
                            </div>

                            {/* <!-- Body --> */}
                            <div className="p-4 sm:p-7 overflow-y-auto">
                                <div className="text-center">
                                    <h3
                                        id="hs-ai-modal-label"
                                        className="text-lg font-semibold text-gray-800 dark:text-gray-200"
                                    >
                                        {company.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                         {company.address}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                     {company.phones}
                                     </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        Invoice #{order.invoice_no}
                                    </p>
                                </div>

                                {/* <!-- Grid --> */}
                                <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
                                    <div>
                                        <span className="block text-xs uppercase text-gray-500 dark:text-gray-500">
                                            Amount paid:
                                        </span>
                                        <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                            TZS{" "}
                                            {numberFormat(
                                                order.status == "paid"
                                                    ? order.order_items_sum_total
                                                    : 0.0
                                            )}
                                        </span>
                                    </div>
                                    {/* <!-- End Col --> */}

                                    <div>
                                        <span className="block text-xs uppercase text-gray-500 dark:text-gray-500">
                                            Date paid:
                                        </span>
                                        <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {dateFormat(order.order_date)}
                                        </span>
                                    </div>
                                    {/* <!-- End Col --> */}

                                    <div>
                                        <span className="block text-xs uppercase text-gray-500 dark:text-gray-500">
                                            Payment method:
                                        </span>
                                        <div className="flex items-center gap-x-2">
                                            {order.payment_method?.name}
                                        </div>
                                    </div>
                                    {/* <!-- End Col --> */}
                                </div>
                                {/* <!-- End Grid --> */}

                                <div className="mt-5 space-y-4 ">
                                    <p>Customer: <b>{order.customer?.name ?? "_____________"}</b></p>
                                    <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200">
                                        Items
                                    </h4>
                                    <div className="border-y border-gray-200 dark:border-gray-700">
                                        <DataTable
                                            columns={invoiceItemColumns}
                                            data={order.order_items}
                                        />
                                    </div>
                                </div>


                                <div className="mt-5 text-center space-y-1 sm:mt-10">
                                    <p className="text-sm italic text-gray-500 dark:text-gray-500">
                                       Thank you for choosing us!
                                    </p>
                                    <p>Issued by: <span>{order.user?.name}</span></p>
                                </div>
                            </div>
                            {/* <!-- End Body --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- End Modal --> */}
            </section>
        </Authenticated>
    );
};

export default Invoice;

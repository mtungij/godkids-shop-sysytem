import { router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteAction = ({
    item,
    url,
    label,
}: {
    item: any;
    url: string;
    label?: string;
}) => {
    return (
        <>
            <div className="text-center">
                <button
                    type="button"
                    className="flex shrink-0 justify-center items-center gap-2 size-[28px] text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls={`hs-delete-item-${item.id}`}
                    data-hs-overlay={`#hs-delete-item-${item.id}`}
                >
                    <Trash2 className="shrink-0 size-4" />
                </button>
            </div>

            <div
                id={`hs-delete-item-${item.id}`}
                className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
                role="dialog"
                tabIndex={-1}
                aria-labelledby="hs-delete-item-${item.id}-label"
            >
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
                    <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-900">
                        <div className="absolute top-2 end-2">
                            <button
                                type="button"
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 dark:focus:bg-gray-600"
                                aria-label="Close"
                                data-hs-overlay={`#hs-delete-item-${item.id}`}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 sm:p-10 text-center overflow-y-auto">
                            <span className="mb-4 inline-flex justify-center items-center size-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
                                <svg
                                    className="shrink-0 size-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                            </span>

                            <h3
                                id="hs-delete-item-${item.id}-label"
                                className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
                            >
                                Delete {label ? label : " item"}?
                            </h3>
                            <p className="text-gray-500 text-sm dark:text-gray-500 text-balance">
                                Are you sure you would like to delete{" "}
                                {label ? label : "this item"}?
                            </p>

                            <div className="mt-6 grid gap-y-2">
                                <button
                                    type="button"
                                    className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                    data-hs-overlay={`#hs-delete-item-${item.id}`}
                                >
                                    No, keep
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        router.delete(route(url, item.id), {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Item deleted successfully"
                                                );
                                            },
                                            preserveState: false,
                                        });
                                    }}
                                    className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteAction;

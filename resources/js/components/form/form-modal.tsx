import React, { FormEvent, ReactNode } from "react";
import Spinner from "../Spinner";
import FormErrors from "../validations/form-errors";
import { Edit, PlusCircle } from "lucide-react";

interface Props {
    buttonLabel: string;
    id: string;
    onSubmit: (e: FormEvent) => void;
    errors: string[];
    modalTitle: string;
    processing: boolean;
    children: ReactNode;
    action?: "create" | "update";
}

const FormModal = ({
    buttonLabel,
    id,
    onSubmit,
    errors,
    modalTitle,
    processing,
    children,
    action = "create",
}: Props) => {
    return (
        <>
            <button
                type="button"
                className="py-1.5 text-nowrap shrink-0 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls={id}
                data-hs-overlay={`#${id}`}
            >
                {action == 'create' ? (<PlusCircle className="size-4" />): <Edit className="size-4" />}
                {buttonLabel}
            </button>

            <div
                id={id}
                className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabIndex={-1}
                aria-labelledby={`${id}-label`}
            >
                <div className="hs-overlay-animation-target hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-2xl sm:w-full m-3 sm:mx-auto">
                    <form
                        onSubmit={onSubmit}
                        autoComplete="off"
                        className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/70"
                    >
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3
                                id={`${id}-label`}
                                className="font-bold text-gray-800 dark:text-white"
                            >
                                {modalTitle}
                            </h3>
                            <button
                                type="button"
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 dark:focus:bg-gray-600"
                                aria-label="Close"
                                data-hs-overlay={`#${id}`}
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
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <FormErrors errors={errors} />

                        {children}

                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                            <button
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                data-hs-overlay={`#${id}`}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {processing ? <Spinner /> : "Save changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormModal;

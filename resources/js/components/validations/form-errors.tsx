import React from "react";

const FormErrors = ({ errors }: { errors: string[] }) => {
    return (
        <>
            {errors.length > 0 && (
                <div
                    className="bg-red-50 border-s-4 border-red-500 p-4 mb-4 dark:bg-red-800/30"
                    role="alert"
                    tabIndex={-1}
                    aria-labelledby="hs-bordered-red-style-label"
                >
                    <div className="flex">
                        <div className="shrink-0">
                            <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
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
                            </span>
                        </div>
                        <div className="ms-3">
                            <h3
                                id="hs-bordered-red-style-label"
                                className="text-gray-800 font-semibold dark:text-white"
                            >
                                Errors!
                            </h3>
                            {errors.map((error, index) => (
                                <p
                                    key={index}
                                    className="text-sm text-red-600 dark:text-red-500 before:content-['•'] before:mr-1"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormErrors;

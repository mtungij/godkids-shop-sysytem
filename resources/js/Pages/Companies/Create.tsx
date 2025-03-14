import Registration from "@/Layouts/RegistrationLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

export default function CreateCompany() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phones: "",
        address: "",
        city: "",
        logo: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("companies.store"), {
            onSuccess: () =>
                toast.success("Your company was created successfully"),
        });
    };

    return (
        <Registration>
            <Head title="Account Registration" />

            <div>
                <div className="max-w-4xl pt-4 rounded-xl shadow bg-white/80 dark:bg-gray-800/80 px-4 pb-10 sm:px-6 lg:px-8 mx-auto">
                    <div className="">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Company Registration
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                All your branches will be created under this
                                company.
                            </p>
                        </div>

                        {Object.values(errors).length > 0 && (
                            <div
                                className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30"
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
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
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
                                        {Object.values(errors).map(
                                            (error, index) => (
                                                <p
                                                    key={index}
                                                    className="text-sm text-red-600 dark:text-red-500 before:content-['•'] before:mr-1"
                                                >
                                                    {error}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="company_name"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                    >
                                        Company Name
                                    </label>
                                </div>

                                <div className="sm:col-span-9">
                                    <input
                                        id="company_name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                        placeholder="ABC STORE CO LTD"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="af-account-email"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                    >
                                        Email
                                    </label>
                                </div>

                                <div className="sm:col-span-9">
                                    <input
                                        id="af-account-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                        placeholder="yourcompany@gmail.com"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="af-account-password"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                    >
                                        Address
                                    </label>
                                </div>

                                <div className="sm:col-span-9">
                                    <div className="space-y-2">
                                        <input
                                            id="af-account-password"
                                            type="text"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="Address"
                                        />
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={(e) =>
                                                setData("city", e.target.value)
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="Region"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <div className="inline-block">
                                        <label
                                            htmlFor="af-account-phone"
                                            className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                        >
                                            Phone numbers
                                        </label>
                                        <span className="text-sm text-gray-400 dark:text-gray-600">
                                            (...)
                                        </span>
                                    </div>
                                </div>

                                <div className="sm:col-span-9">
                                    <div className="sm:flex">
                                        <input
                                            id="af-account-phone"
                                            type="text"
                                            value={data.phones}
                                            onChange={(e) =>
                                                setData(
                                                    "phones",
                                                    e.target.value
                                                )
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="(+xxx) xxx xxx xxx"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex justify-end gap-x-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Register & Continue"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Registration>
    );
}

import ApplicationLogo from "@/Components/ApplicationLogo";
import { ModeToggle } from "@/components/mode-toggle";
import Registration from "@/Layouts/RegistrationLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Lock } from "lucide-react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "Your address",
        gender: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="h-dvh overflow-y-auto scroll-bar flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Head title="Log in" />

            <div className="w-full space-y-6 max-w-sm md:max-w-4xl">
                <div className="grid items-center justify-center">
                    <Link href="/" className="block">
                        <ApplicationLogo className="size-16" />
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded">
                    <div className="bg-cyan-700/50 flex items-center justify-between -mx-6 -mt-6 mb-6 p-2 text-white text-xl font-medium">
                        <div className="flex items-center">
                            <Lock className="mr-2" /> Registration
                        </div>

                        <ModeToggle />
                    </div>
                    <div className="">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Super admin details
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Fill in your personal details to create your
                                account.
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
                                        htmlFor="af-account-full-name"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                    >
                                        Full name
                                    </label>
                                </div>

                                <div className="sm:col-span-9">
                                    <div className="sm:flex">
                                        <input
                                            id="af-account-full-name"
                                            type="text"
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="First name"
                                        />
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="Last name"
                                        />
                                    </div>
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
                                        placeholder="youremail@gmail.com"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="af-account-password"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="sm:col-span-9">
                                    <div className="space-y-2">
                                        <input
                                            id="af-account-password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="Enter password"
                                        />
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="Confirm password"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <div className="inline-block">
                                        <label
                                            htmlFor="af-account-phone"
                                            className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                        >
                                            Phone
                                        </label>
                                        <span className="text-sm text-gray-400 dark:text-gray-600">
                                            ...
                                        </span>
                                    </div>
                                </div>

                                <div className="sm:col-span-9">
                                    <div className="sm:flex">
                                        <input
                                            id="af-account-phone"
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                            placeholder="(+xxx) xxx xxx xxx"
                                        />
                                        <select className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600">
                                            <option value={"mobile"}>
                                                Mobile
                                            </option>
                                            <option value={"home"}>Home</option>
                                            <option value={"work"}>Work</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="af-account-gender-checkbox"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                    >
                                        Gender
                                    </label>
                                </div>

                                <div className="sm:col-span-9">
                                    <div className="sm:flex">
                                        <label
                                            htmlFor="af-account-gender-checkbox"
                                            className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="af-account-gender-checkbox"
                                                value="male"
                                                onChange={(e) =>
                                                    setData(
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="shrink-0 mt-0.5 border-gray-300 rounded-full text-cyan-600 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-500 dark:checked:bg-cyan-500 dark:checked:border-cyan-500 dark:focus:ring-offset-gray-800"
                                                id="af-account-gender-checkbox"
                                            />
                                            <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">
                                                Male
                                            </span>
                                        </label>

                                        <label
                                            htmlFor="af-account-gender-checkbox-female"
                                            className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                        >
                                            <input
                                                type="radio"
                                                name="af-account-gender-checkbox"
                                                className="shrink-0 mt-0.5 border-gray-300 rounded-full text-cyan-600 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-500 dark:checked:bg-cyan-500 dark:checked:border-cyan-500 dark:focus:ring-offset-gray-800"
                                                id="af-account-gender-checkbox-female"
                                                value={"female"}
                                                onChange={(e) =>
                                                    setData(
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">
                                                Female
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex justify-end gap-x-2">
                                <Link
                                    href={route("login")}
                                    className="inline-flex items-center text-sm font-medium  text-green-700 hover:underline hover:underline-offset-4 focus:outline-none  disabled:opacity-50"
                                >
                                    Have account already? Login
                                </Link>
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
        </div>
    );
}

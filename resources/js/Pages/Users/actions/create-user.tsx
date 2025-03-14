import KdSelectInput from "@/components/form/kd-select-input";
import KdTextInput from "@/components/form/kd-text-input";
import Spinner from "@/components/Spinner";
import FormErrors from "@/components/validations/form-errors";
import { genders, roles } from "@/lib/data";
import { Branch } from "@/types";
import { Deferred, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

const CreateUser = ({ branches }: { branches: Branch[] }) => {
    const { data, post, setData, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        role: "",
        gender: "",
        // branch_id: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("users.store"), {
            onSuccess: () => {
                toast.success("User created successfully.");
                reset();
            },
        });
    };
    return (
        <>
            <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-create-user-modal"
                data-hs-overlay="#hs-create-user-modal"
            >
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
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
                Add user
            </button>

            <div
                id="hs-create-user-modal"
                className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabIndex={-1}
                aria-labelledby="hs-create-user-modal-label"
            >
                <div className="hs-overlay-animation-target hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-2xl sm:w-full m-3 sm:mx-auto">
                    <form
                        onSubmit={submit}
                        className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/70"
                    >
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3
                                id="hs-create-user-modal-label"
                                className="font-bold text-gray-800 dark:text-white"
                            >
                                Add new user
                            </h3>
                            <button
                                type="button"
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 dark:focus:bg-gray-600"
                                aria-label="Close"
                                data-hs-overlay="#hs-create-user-modal"
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

                        <FormErrors errors={Object.values(errors)} />

                        <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <KdTextInput
                                label="Full name"
                                id={'Full name'}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Full name"
                            />
                            <KdTextInput
                                label="Email"
                                id={'email'}
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <KdTextInput
                                label="Phone number"
                                id={'Phone number'}
                                type="number"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                placeholder="2557xxxxxxxx"
                            />
                            <KdSelectInput
                                label="Position"
                                id={'position'}
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                data={roles}
                            />
                            <KdSelectInput
                                label="Gender"
                                id={'gender'}
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                data={genders}
                            />
                            {/* <Deferred data={"branches"} fallback={<Spinner />}>
                                <KdSelectInput
                                    label="Branch"
                                    value={data.branch_id}
                                    onChange={(e) =>
                                        setData("branch_id", e.target.value)
                                    }
                                    data={branches}
                                />
                            </Deferred> */}

                            <div className="max-w-sm">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mb-2 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                    placeholder="********"
                                />
                            </div>
                            <div className="max-w-sm">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-medium mb-2 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                                    placeholder="********"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                            <button
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                data-hs-overlay="#hs-create-user-modal"
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

export default CreateUser;

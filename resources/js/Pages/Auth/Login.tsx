import ApplicationLogo from "@/Components/ApplicationLogo";
import Checkbox from "@/Components/Checkbox";
import KdTextInput from "@/components/form/kd-text-input";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { ModeToggle } from "@/components/mode-toggle";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Button } from "@/components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { LoaderIcon, Lock } from "lucide-react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="h-dvh flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Head title="Log in" />

            <div className="w-full space-y-6 max-w-xs md:max-w-sm">
                <div className="grid items-center justify-center">
                    <Link href="/" className="block">
                        <ApplicationLogo className="size-16" />
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded">
                    <div className="bg-cyan-700/50 flex items-center justify-between -mx-6 -mt-6 mb-6 p-2 text-white text-xl font-medium">
                       <div className="flex items-center">
                           <Lock className="mr-2"/> Login
                       </div>

                       <ModeToggle />
                    </div>
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                    <form
                        onSubmit={submit}
                        className="grid gap-2 w-full"
                        autoComplete="off"
                    >
                        <KdTextInput
                            type="email"
                            label="Email Address"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                        <KdTextInput
                            type="password"
                            label="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                        <div className="w-full mt-4 flex flex-col items-center gap-4 justify-center">
                            <Button
                                type="submit"
                                className="ms-4 w-full"
                                disabled={processing}
                            >
                                {processing ? <span className="flex items-center">
                                    <LoaderIcon className="size-4 mr-1 animate-spin" />
                                    logging in...
                                </span>: "Login"}
                            </Button>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="rounded-md text-sm text-center text-gray-600 underline underline-offset-4 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

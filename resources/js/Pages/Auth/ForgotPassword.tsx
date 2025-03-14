import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import { ModeToggle } from "@/components/mode-toggle";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Button } from "@/components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { ArrowLeftCircle, LoaderIcon, Lock, MailCheck } from "lucide-react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <div className="h-dvh flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Head title="Forgot Password" />

            <div className="w-full space-y-6 max-w-xs md:max-w-sm">
                <div className="grid items-center justify-center">
                    <Link href="/" className="block">
                        <ApplicationLogo className="size-16" />
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded">
                    <div className="bg-cyan-700/50 flex items-center justify-between -mx-6 -mt-6 mb-6 p-2 text-white text-xl font-medium">
                        <div className="flex items-center">
                            <MailCheck className="mr-2" /> Forgot Password
                        </div>

                        <ModeToggle />
                    </div>

                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-4 flex items-center justify-between">
                            <Button
                                onClick={() => router.visit(route("login"))}
                                size={"icon"}
                                type="button"
                                variant={"outline"}
                            >
                                <ArrowLeftCircle />
                            </Button>
                            <Button className="ms-4" disabled={processing}>
                                {processing ? (
                                    <span className="flex items-center">
                                        <LoaderIcon className="size-4 mr-1 animate-spin" />
                                        sending email...
                                    </span>
                                ) : (
                                    " Email Password Reset Link"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

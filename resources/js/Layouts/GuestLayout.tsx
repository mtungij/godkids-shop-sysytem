import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen overflow-y-auto bg-reg-pattern2 flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className="grid items-center justify-center">
                <Link href="/" className="block">
                    <ApplicationLogo className="size-16" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-y-auto bg-white/80 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800/70">
                {children}
            </div>
        </div>
    );
}

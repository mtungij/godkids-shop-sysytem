import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Registration({ children }: PropsWithChildren) {
    return (
        <div className="grid min-h-screen overflow-y-auto bg-reg-pattern2 bg-gray-100 pt-4 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className="flex items-center justify-center py-4 gap-4">
                <Link href="/">
                    <ApplicationLogo className="h-10 w-10 fill-current text-gray-500" />
                </Link>

                <h3 className="text-xl font-semibold text-primary">
                    Mauzodata Sales Innovation
                </h3>
            </div>

            <div className="w-full overflow-y-auto bg-transparent py-4 ">
                {children}
            </div>
        </div>
    );
}

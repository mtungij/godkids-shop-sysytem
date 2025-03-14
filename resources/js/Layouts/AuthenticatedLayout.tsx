import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import NavigationBar from "@/Utils/NavigationBar";
import SidebarItems from "@/Utils/app-sidebar";
import { ArrowLeftCircle } from "lucide-react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const prevUrl = usePage().props.prev_url;

    return (
        <div className="flex overflow-hidden">
            <aside className="min-w-[240px] print:hidden overflow-hidden bg-white border-r border-r-gray-200 w-[280px] h-dvh sticky top-0 dark:border-r-gray-700 dark:bg-gray-800 hidden md:block">
                <SidebarItems />
            </aside>
            <div className="overflow-auto w-full h-dvh scroll-bar bg-gray-100 dark:bg-gray-900">
                <NavigationBar />
                {header && (
                    <header className="shadow print:hidden bg-white dark:bg-gray-800 sticky top-14 z-10">
                        <div className="mx-auto max-w-full flex items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
                            <Link
                                className="size-7 text-cyan-500"
                                href={prevUrl as string}
                                title="Go back"
                            >
                                <ArrowLeftCircle className="size-6 mr-1" />
                            </Link>
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}

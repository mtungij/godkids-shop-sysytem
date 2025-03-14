import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { ModeToggle } from "@/components/mode-toggle";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Circle, RotateCcw, ShoppingBagIcon } from "lucide-react";
import { SwitchBranch } from "@/components/actions/SwitchBranch";

const NavigationBar = () => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const user = usePage().props.auth.user;
    return (
        <nav className="border-b z-30 sticky top-0 print:hidden bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 justify-between">
                    <div className="flex place-items-center gap-1">
                        <div className="flex shrink-0 items-center">
                            <Sidebar />
                            <Link href="#" className="hidden md:inline-block">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>
                        <div className="hidden sm:flex text-orange-500">
                            {user.branch?.name}
                        </div>
                    </div>
                    <div className="ms-6 flex items-center gap-3">
                        <Button variant={"outline"} size={"icon"} asChild>
                            <Link href={route('pos.index')} title="Go to cart">
                                <ShoppingBagIcon className="size-6" />
                            </Link>
                        </Button>
                        <SwitchBranch />
                        <Button variant={"outline"} size={"icon"} asChild>
                            <a href="" title="Refresh page">
                                <RotateCcw className="size-6" />
                            </a>
                        </Button>
                        <ModeToggle />
                        <div className="hs-dropdown relative inline-flex">
                            <button
                                id="hs-dropdown-default-menu"
                                type="button"
                                className="hs-dropdown-toggle size-9 flex items-center justify-center text-sm font-medium rounded-full border shadow dark:bg-pink-800 dark:border-pink-700 dark:text-white dark:hover:bg-pink-700 dark:focus:bg-pink-700"
                                aria-haspopup="menu"
                                aria-expanded="false"
                                aria-label="Dropdown"
                            >
                                {user.name[0]}
                            </button>

                            <div
                                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="hs-dropdown-default-menu"
                            >
                                {/* <div className="p-1 space-y-0.5">
                                    <a
                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                                        href="#"
                                    >
                                        Branch Account
                                    </a>
                                </div>
                                <div className="p-1 space-y-0.5">
                                    <a
                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                                        href="#"
                                    >
                                        Upgrade License
                                    </a>
                                </div> */}
                                <div className="p-1 space-y-0.5">
                                    <Link
                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                                        href={route("profile.edit")}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                                        href={route("logout")}
                                        method="post"
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;

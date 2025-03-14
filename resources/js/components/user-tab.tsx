import { Link } from "@inertiajs/react";
import clsx from "clsx";
import React from "react";

type UserTabProps = {
    icon: React.ReactNode; // The icon element passed as a prop
    label: string; // The label text for the sidebar item
    href?: string; // Optional href for navigation
};

const UserTab: React.FC<UserTabProps> = ({ icon, label, href = "#" }) => {
    // Check if the current URL matches the href
    const isActive = window.location.href.startsWith(href)
    return (
        <Link
            className={clsx(
                "flex items-center gap-2 px-4 py-1.5 rounded  transition-colors duration-150",
                isActive ? "bg-green-500 dark:bg-green-700 dark:text-white" : "bg-gray-200 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-400"
            )}
            href={href}
        >
            <span className="icon">{icon}</span>
            <span>{label}</span>
        </Link>
    );
};

export default UserTab;

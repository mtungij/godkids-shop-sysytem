import { Link } from "@inertiajs/react";
import { FileSpreadsheet } from "lucide-react";

interface ReportsCardProps {
    title: string;
    description?: string;
    link: string;
}

const ReportsCard = ({ title, description, link }: ReportsCardProps) => {
    return (
        <Link
            className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-gray-800 dark:border-gray-700"
            href={link}
        >
            <div className="p-4 md:p-5">
                <div className="flex justify-between items-center gap-x-3">
                    <div className="grow flex items-center gap-1">
                        <FileSpreadsheet className="size-10 text-gray-400 dark:text-gray-500" />
                        <div>
                            <h3 className="group-hover:text-cyan-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                                {title}
                            </h3>
                            {description && (
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <svg
                            className="shrink-0 size-5 text-gray-800 dark:text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ReportsCard;

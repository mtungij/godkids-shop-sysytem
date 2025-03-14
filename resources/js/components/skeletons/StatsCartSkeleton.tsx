import React from "react";

const StatsCardSkeleton = ({ columns = 1 }: { columns: number }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: columns }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col items-start bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md animate-pulse"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="mt-2 h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="flex items-center justify-between w-full text-sm mt-2">
                        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCardSkeleton;

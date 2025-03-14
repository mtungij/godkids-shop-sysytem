import React, { ReactNode } from "react";

const TableWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full  border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm  p-0 text-gray-900 dark:text-gray-100 sm:rounded-lg dark:bg-gray-800 dark:border-gray-700">
                {children}
            </div>
        </div>
    );
};

export default TableWrapper;

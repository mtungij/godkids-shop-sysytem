interface Props {
    columns?: number;
    rows?: number;
}

const TableSkeleton = ({ columns, rows }: Props) => {
    return (
        <div className="animate-pulse">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {[...Array(columns ?? 5)].map((_, index) => (
                            <th key={index} className="px-6 py-3 text-start">
                                <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-700"></div>
                            </th>
                        ))}
                        <th className="px-6 py-3 text-end">
                            <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-700"></div>
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[...Array(rows ?? 10)].map((_, rowIndex) => (
                        <tr key={rowIndex} className="h-14">
                            {[...Array(columns ?? 5)].map((_, colIndex) => (
                                <td key={colIndex} className="px-6 py-3">
                                    <div className="h-4 w-full bg-gray-300 rounded dark:bg-gray-700"></div>
                                </td>
                            ))}
                            <td className="px-6 py-3 text-end">
                                <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-700"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;

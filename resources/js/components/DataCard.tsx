import React from "react";

interface ConversionData {
  goal: string;
  unique: number | string;
  total: number | string;
  cr: number | string;
}

interface GoalConversionTableProps {
  data: ConversionData[];
}

const GoalConversionTable: React.FC<GoalConversionTableProps> = ({ data }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Goal Conversions</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Goal</th>
              <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Unique</th>
              <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Total</th>
              <th className="px-4 py-2 text-gray-600 dark:text-gray-300">CR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
                }`}
              >
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{item.goal}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{item.unique}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{item.total}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{item.cr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <a
          href="#"
          className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
        >
          View full reports
        </a>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GoalConversionTable;

import React from "react";

interface LocationData {
  country: string;
  percentage: string;
}

interface SigleColumnDataCardProps {
  data: LocationData[];
}

const SigleColumnDataCard: React.FC<SigleColumnDataCardProps> = ({ data }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Location</h2>
      <div className="mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">{item.country}</span>
            <div className="flex items-center w-3/4">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${parseFloat(item.percentage.replace(",", "."))}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm text-gray-800 dark:text-gray-100">{item.percentage}</span>
          </div>
        ))}
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

export default SigleColumnDataCard;

import React from "react";

interface AccountSkeletonProps {
  loops: number; // Number of times to repeat the skeleton component
}

const AccountSkeleton: React.FC<AccountSkeletonProps> = ({ loops }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: loops }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse"
        >
          {/* Total Costs Skeleton */}
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Slider Skeleton */}
          <div className="mb-6">
            <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="flex justify-between text-sm mt-2">
              <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Project Description Skeleton */}
          <div className="mb-4">
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Talents Costs Skeleton */}
          <div className="bg-gray-300 dark:bg-gray-700 rounded-md p-4">
            <div className="h-4 w-1/4 bg-gray-400 dark:bg-gray-600 rounded mb-4"></div>

            {/* Repeating Skeleton Rows */}
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex justify-between items-center mb-2 last:mb-0"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full mr-2"></div>
                  <div className="h-4 w-32 bg-gray-400 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="h-4 w-12 bg-gray-400 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>

          {/* View All Costs Skeleton */}
          <div className="text-center mt-4">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountSkeleton;

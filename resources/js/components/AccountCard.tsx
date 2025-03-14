import { Account } from "@/lib/interfaces";
import { numberFormat } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
    branch: string;
    branch_id: number;
    total: number;
    accounts: Account[];
    totalBalance: number;
}

const CostBreakdownCard: React.FC<Props> = ({ branch, total, branch_id, accounts, totalBalance }) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value); // Example: Handle slider change
    };

    return (
        <div className="bg-white dark:bg-gray-800 dark:text-white text-gray-800 p-6 rounded-lg max-w-sm shadow-lg">
            {/* Total Costs */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1 text-cyan-600 dark:text-cyan-400">
                    {branch.toUpperCase()}
                </h2>
                <p className="text-4xl font-bold">
                    <span className="text-sm">TZS</span> {numberFormat(total)}
                </p>
            </div>

            {/* Slider */}
            <div className="flex flex-col mb-6">
                <input
                    type="range"
                    min="0"
                    max={totalBalance}
                    defaultValue={total}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>0.00 TZS</span>
                    <span>
                        {totalBalance > 0
                            ? numberFormat(totalBalance)
                            : totalBalance?.toLocaleString()}{" "}
                        TZS
                    </span>
                </div>
            </div>

            {/* Project Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A breakdown of account balances associated with this branch.
            </p>

            {/* Account Balances */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
                <h3 className="text-sm font-semibold mb-2">Account balances</h3>
                <ul>
                    {accounts.map((account) => (
                        <li
                            key={account.payment_method?.name}
                            className="flex justify-between items-center mb-2 last:mb-0"
                        >
                            <div className="flex items-center">
                                <span className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                                    {account.payment_method?.name[0]}
                                </span>
                                <span>{account.payment_method?.name}</span>
                            </div>
                            <span>
                                {account.amount > 0
                                    ? numberFormat(account.amount)
                                    : account.amount?.toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* View All Costs */}
            <div className="text-center mt-4">
                <Link
                    href={route('branches.transactions', branch_id)}
                    className="text-green-600 dark:text-green-400 text-sm font-medium hover:underline"
                >
                    View all transactions &rarr;
                </Link>
            </div>
        </div>
    );
};

export default CostBreakdownCard;

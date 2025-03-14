// Card.tsx
import { numberFormat } from "@/lib/utils";
import { ChartArea } from "lucide-react";
import React, { ReactNode } from "react";

export interface StatsCardProps {
    title: string;
    amount: number;
    net?: string;
    percentage?: string;
    icon?: ReactNode;
    isPositive: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    amount,
    net,
    percentage,
    icon,
    isPositive,
}) => {
    return (
        <div className="flex flex-col items-start bg-white dark:bg-gray-800 dark:text-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
                {icon ?? <ChartArea />}
                <h4 className="text-sm font-medium">{title}</h4>
            </div>
            <p className="text-xl font-semibold">{numberFormat(amount)}</p>
            <div className="flex items-center justify-between w-full text-sm mt-2">
                {net && <p className="text-muted-foreground">{net}</p>}
                <p
                    className={`flex items-center ${
                        isPositive ? "text-cyan-400" : "text-red-400"
                    }`}
                >
                    {isPositive ? "▲" : "▼"} {percentage}
                </p>
            </div>
        </div>
    );
};

export default StatsCard;

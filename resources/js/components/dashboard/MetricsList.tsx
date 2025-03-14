import React from "react";
import StatsCard, { StatsCardProps } from "../StatsCard";
import { Globe, Link, Store, Tag } from "lucide-react";

const MetricsList = ({ statsData }: { statsData: StatsCardProps[] }) => {
    const iconMap: { [key: string]: React.ReactNode } = {
        sales: <Store />,
        profit: <Tag />,
        expenses: <Link />,
        creditpayments: <Globe />,
    };

    statsData?.forEach((stat) => {
        stat.icon = iconMap[stat.title.toLowerCase()];
    });
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData?.map((card, index) => (
                <StatsCard key={index} {...card} />
            ))}
        </div>
    );
};

export default MetricsList;

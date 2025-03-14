import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";

interface UserCardProps {
    id: number | string;
    name: string;
    role: string;
    phone: string;
    email: string;
    branch: string;
    isActive?: boolean;
    tags: string[];
    sales_url?: string;
    blockUser?: boolean;
    profileColor?: string; // Dynamic color for profile header
}

const UserCard: React.FC<UserCardProps> = ({
    id,
    name,
    role,
    phone,
    email,
    branch,
    tags,
    sales_url,
    isActive,
    profileColor = "bg-pink-700",
    blockUser = false,
}) => {
    const loggedInUser = usePage().props.auth.user;

    return (
        <div className="max-w-full bg-gray-800 text-gray-200 rounded-s-0 shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className={`${profileColor} h-24 relative`}>
                <div className="absolute bottom-[-30px] left-5 flex items-center justify-center w-16 h-16 bg-pink-600 rounded-full shadow-md text-2xl font-semibold text-gray-100">
                    {name[0]} {/* <!-- End Header --> */}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-10">
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-gray-400 text-sm mb-4">{role}</p>

                <div className="text-sm mb-4">
                    <p className="flex justify-between">
                        <span className="text-gray-400">Phone:</span>
                        <span>{phone}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span>{email}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-400">Current branch:</span>
                        <span className="text-green-400 font-semibold">
                            {branch}
                        </span>
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-700 px-2 py-1 text-xs rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => router.post(route("users.block", id))}
                        className="flex items-center gap-2 text-gray-300 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
                        disabled={!blockUser}
                    >
                        <span>
                            {isActive ? (
                                "Active"
                            ) : (
                                <span className="text-red-500">blocked</span>
                            )}
                        </span>
                    </button>
                     <Button disabled={loggedInUser.role !== 'admin'} size={"icon"} variant={"outline"}>
                        <Link href={route("users.edit", id)}>
                            <Edit />
                        </Link>
                    </Button>
                    <Link
                        href={sales_url as string}
                        className="flex items-center gap-2 bg-teal-600 text-gray-100 px-4 py-2 rounded-md hover:bg-teal-700"
                    >
                        <span>View sales</span>
                        <span>↗</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserCard;

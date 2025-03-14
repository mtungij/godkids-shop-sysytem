import { Branch } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import UpdateBranchAction from "./actions/update-branch";
import dayjs from "dayjs";

export const branchColumns: ColumnDef<Branch>[] = [
    {
        accessorKey: "id",
        header: "#",
        cell: ({ row }) => {
            return (
                <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                    {row.original.name[0]}
                </span>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "phones",
        header: "Phone numbers",
    },
    {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => {
            const date = dayjs(row.getValue("created_at")).fromNow();
            return <span className="text-muted-foreground">{date}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <UpdateBranchAction branch={row.original} />;
        },
    },
];

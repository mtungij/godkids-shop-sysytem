import DeleteAction from "@/components/actions/DeleteAction";
import { Supplier } from "@/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import EditSupplier from "./actions/edit-supplier";

export const suppliersColumns: ColumnDef<Supplier>[] = [
    {
        accessorKey: "#",
        header: "#",
        cell: ({ row }) => {
            return <span className="bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">{row.original.name[0]}</span>;
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return <span>{row.original.name}</span>;
        }
    },
    {
        accessorKey: "contact",
        header: "Contact",
        cell: ({ row }) => {
            return <span>{row.original.contact}</span>;
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <EditSupplier supplier={row.original} />
                    <DeleteAction url="suppliers.destroy" item={row.original} label={row.original.name} />
                </div>
            );
        }
    }
];
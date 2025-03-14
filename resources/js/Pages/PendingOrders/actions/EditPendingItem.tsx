import { OrderItem } from "@/lib/interfaces";
import { router } from "@inertiajs/react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

const EditPendingItem = ({ item }: { item: OrderItem }) => {
    const [qty, setQty] = React.useState<string | number>(item.qty);

    const handleChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            
            // update the qty
            router.patch(
                route("orderItems.update", item.id),
                { qty },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        toast.success("Updated successfully.");
                    },
                }
            );
        },
        1000
    );
    return (
        <div>
            <NumericFormat
                name="qty"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                onBlur={handleChange}
                className="w-full min-w-20 px-3 py-1 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                thousandSeparator={true}
                allowNegative={false}
            />
        </div>
    );
};

export default EditPendingItem;

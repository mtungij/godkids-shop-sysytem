import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "./button";
import { useAutoAnimate } from '@formkit/auto-animate/react'


interface FormRepeaterProps<T> {
    initialValues: T;
    renderFields: (
        item: T,
        index: number,
        handleChange: (
            index: number,
            field: keyof T | undefined,
            value: any
        ) => void
    ) => React.ReactNode;
    onChange?: (items: T[]) => void; // Callback for items
}

export default function FormRepeater<T>({
    initialValues,
    renderFields,
    onChange,
}: FormRepeaterProps<T>) {
    const [items, setItems] = useState<T[]>([initialValues]);
    const [parent] = useAutoAnimate()

    const handleChange = (
        index: number,
        field: keyof T | undefined,
        value: any
    ) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index
                    ? field
                        ? { ...item, [field]: value } // Single field update
                        : { ...item, ...value } // Multiple field update
                    : item
            )
        );
    };

    const handleAddItem = () => {
        setItems((prev) => [...prev, initialValues]);
    };

    const handleRemoveItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    // Notify parent component about changes
    useEffect(() => {
        onChange?.(items);
    }, [items, onChange]);

    return (
        <div className="space-y-4" ref={parent}>
            {items.map((item, index) => (
                <div key={index} className="rounded p-2 bg-white dark:bg-gray-800">  
                    {renderFields(item, index, handleChange)}
                    <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 cursor-pointer py-1.5 px-2 rounded-md text-sm"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <Button
                type="button"
                variant={'outline'}
                onClick={handleAddItem}
            >
              <PlusCircle className="size-4 mr-1" />
                Add Item
            </Button>
        </div>
    );
}

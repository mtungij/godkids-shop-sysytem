import { numberFormat } from "@/lib/utils";
import React, { ChangeEvent } from "react";

interface Props {
    label: string;
    value?: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    autoFocus?: boolean;
    data: any[];
    id?: string | number;
}

const KdSearchSelect = ({
    label,
    value,
    onChange,
    autoFocus,
    data,
    id = "-ID",
}: Props) => {
    return (
        <div className="max-w-sm w-full">
            <label
                htmlFor={label + id}
                className="block text-sm font-medium mb-2 dark:text-white"
            >
                {label}
            </label>
            <select
                value={value}
                id={label + id}
                onChange={onChange}
                data-hs-select='{
"hasSearch": true,
"searchPlaceholder": "Search...",
"searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-cyan-500 before:absolute before:inset-0 before:z-[1] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 py-2 px-3",
"searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-gray-900",
"placeholder": "Search...",
"toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 dark:text-gray-200 \" data-title></span></button>",
"toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
"dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-700 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500 dark:bg-gray-900 dark:border-gray-700",
"optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800",
"optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-gray-200 \" data-title></div></div></div>",
"extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-gray-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}'
            >
                <option value="">Select</option>
                {data?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name} {item?.stock ? (<>({numberFormat(item.stock)})</>): null}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default KdSearchSelect;

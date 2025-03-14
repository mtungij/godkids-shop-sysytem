import { ChangeEvent } from "react";

interface Props {
    label: string;
    value?: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    autoFocus?: boolean;
    data: {
        id: string|any;
        name: string;
    }[];
    id?: string|number;
    required?: boolean;
}

const KdSelectInput = ({ label, value, onChange, autoFocus, data, id = "-ID", required = false }: Props) => {
    return (
        <div className="max-w-sm">
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
                className="py-2 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                required={required}
            >
                <option value="">Choose</option>
                {data?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default KdSelectInput;

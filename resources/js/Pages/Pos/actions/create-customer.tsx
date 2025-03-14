import FormModal from "@/components/form/form-modal";
import KdTextInput from "@/components/form/kd-text-input";
import { Customer } from "@/lib/interfaces";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const CreateCustomerAction = () => {
    const customer = usePage().props.customer as Customer;

    const { data, setData, errors, post, reset, processing } = useForm({
        name: customer?.name ?? "",
        contact: customer?.contact ?? "",
        address: customer?.address ?? "",
        from: 'pos',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("customers.store"), {
            onSuccess: () => {
                toast.success("Created successfully.");
                reset();
            },
        });
    };
    return (
        <FormModal
            onSubmit={submit}
            processing={processing}
            errors={Object.values(errors)}
            modalTitle="Create new customer"
            buttonLabel=""
            id="create-customer-modal"
        >
            <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-1 gap-4">
                <KdTextInput
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Customer name"
                />
                <KdTextInput
                    label="Contact(phone,email ...)"
                    value={data.contact}
                    onChange={(e) => setData("contact", e.target.value)}
                />

                <KdTextInput
                    label="Address"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                />
            </div>
        </FormModal>
    );
};

export default CreateCustomerAction;

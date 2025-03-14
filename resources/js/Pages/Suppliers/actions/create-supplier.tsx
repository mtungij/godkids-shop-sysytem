import FormModal from "@/components/form/form-modal";
import KdTextInput from "@/components/form/kd-text-input";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const CreateSupplier = () => {
    const { data, setData, errors, post, reset, processing } = useForm({
        name: "",
        contact: "",
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("suppliers.store"), {
            onSuccess: () => {
                toast.success("supplier created successfully.");
                reset();
            },
        });
    };
    return (
        <FormModal
            onSubmit={submit}
            processing={processing}
            errors={Object.values(errors)}
            modalTitle="Create new supplier"
            buttonLabel="Add supplier"
            id="create-supplier-modal"
        >
            <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-1 gap-4">
                <KdTextInput
                    label="Supplier name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="supplier name"
                />
                <KdTextInput
                    label="Contact(email, phone, address)"
                    value={data.contact}
                    onChange={(e) => setData("contact", e.target.value)}
                />
            </div>
        </FormModal>
    );
};

export default CreateSupplier;

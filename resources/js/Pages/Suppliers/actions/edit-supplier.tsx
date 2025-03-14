import FormModal from "@/components/form/form-modal";
import KdTextInput from "@/components/form/kd-text-input";
import { Supplier } from "@/lib/interfaces";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const EditSupplier = ({ supplier }: { supplier: Supplier }) => {
    const { data, setData, errors, patch, processing } = useForm({
        name: supplier.name,
        contact: supplier.contact,
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();

        patch(route("suppliers.update", supplier.id), {
            onSuccess: () => {
                toast.success("Updated successfully.");
            },
        });
    };
    return (
        <FormModal
            onSubmit={submit}
            processing={processing}
            errors={Object.values(errors)}
            modalTitle="Edit supplier"
            buttonLabel=""
            id={`edit-supplier-modal-${supplier.id}`}
            action="update"
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

export default EditSupplier;

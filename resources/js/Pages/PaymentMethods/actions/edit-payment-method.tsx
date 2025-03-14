import FormModal from "@/components/form/form-modal";
import KdTextInput from "@/components/form/kd-text-input";
import { PaymentMethod } from "@/lib/interfaces";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const EditPaymentMethodAction = ({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
    const { data, setData, errors, patch, processing } = useForm({
        ...paymentMethod,
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();

        patch(route("paymentMethods.update", paymentMethod.id), {
            onSuccess: () => {
                toast.success("Updated successfully.");
            },
            preserveState: true,
        });
    };
    return (
        <FormModal
            onSubmit={submit}
            processing={processing}
            errors={Object.values(errors)}
            modalTitle="Create new Payment Method"
            buttonLabel=""
            id={`edit-paymentMethod${paymentMethod.id}-modal`}
            action="update"
        >
            <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-1 gap-4">
                <KdTextInput
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
            </div>
        </FormModal>
    );
};

export default EditPaymentMethodAction;

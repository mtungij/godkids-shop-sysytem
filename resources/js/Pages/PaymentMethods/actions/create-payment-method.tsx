import FormModal from "@/components/form/form-modal";
import KdTextInput from "@/components/form/kd-text-input";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const CreatePaymentMethod = () => {
    const { data, setData, errors, post, reset, processing } = useForm({
        name: "",
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("paymentMethods.store"), {
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
            modalTitle="Create new branch"
            buttonLabel="Add payment"
            id="create-payment-method-modal"
        >
            <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-1 gap-4">
                <KdTextInput
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="M-PESA LIPA"
                />
            </div>
        </FormModal>
    );
};

export default CreatePaymentMethod;

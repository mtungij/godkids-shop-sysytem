import FormModal from "@/components/form/form-modal";
import KdNumericInput from "@/components/form/kd-numeric-input";
import KdSelectInput from "@/components/form/kd-select-input";
import KdTextInput from "@/components/form/kd-text-input";
import { Order, PaymentMethod } from "@/lib/interfaces";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const PayCreditOrder = ({ order }: { order: Order }) => {
    const { data, setData, errors, post, reset, processing } = useForm({
        payment_method_id: "",
        amount: "",
    });

    const paymentMethods = usePage().props.paymentMethods as PaymentMethod[];

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("credit-orders.store", order.id), {
            onSuccess: () => {
                toast.success("Payment Added successfully.");
                reset();
            },
            preserveScroll: true,
            preserveState: false,
        });
    };
    return (
        <FormModal
            onSubmit={submit}
            processing={processing}
            errors={Object.values(errors)}
            modalTitle={`Pay credit order #${order.invoice_no}`}
            buttonLabel="pay"
            id={`pay-credit-order-${order.id}-modal`}
        >
            <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-1 gap-4">
                <KdSelectInput
                    label="Account"
                    value={data.payment_method_id}
                    onChange={(e) =>
                        setData("payment_method_id", e.target.value)
                    }
                    data={paymentMethods}
                />
                <KdNumericInput
                    label="Paid amount"
                    value={data.amount}
                    onChange={(e) => setData("amount", e.target.value)}
                />
            </div>
        </FormModal>
    );
};

export default PayCreditOrder;

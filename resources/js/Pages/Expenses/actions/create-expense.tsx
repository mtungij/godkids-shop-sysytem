import KdNumericInput from "@/components/form/kd-numeric-input";
import KdSelectInput from "@/components/form/kd-select-input";
import KdTextInput from "@/components/form/kd-text-input";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import FormErrors from "@/components/validations/form-errors";
import { PaymentMethod } from "@/lib/interfaces";
import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

const CreateExpense = ({
    paymentMethods,
}: {
    paymentMethods: PaymentMethod[];
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        payment_method_id: "",
        item: "",
        cost: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("expenses.store"), {
            onSuccess: () => {
                reset();
                toast.success("Expense created successfully");
            },
            preserveScroll: true,
            preserveState: true,
            onError: () => {
                toast.error("Error occurred while creating expense, please make sure all fields are filled correctly");
            }
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <KdSelectInput
                        label="Account"
                        value={data.payment_method_id}
                        onChange={(e) =>
                            setData("payment_method_id", e.target.value)
                        }
                        data={paymentMethods}
                        required={true}
                    />
                    <KdTextInput
                        label="Description"
                        value={data.item}
                        onChange={(e) => setData("item", e.target.value)}
                        required={true}
                    />
                    <KdNumericInput
                        label="Cost"
                        value={data.cost}
                        onChange={(e) => setData("cost", e.target.value)}
                        required={true}
                    />
                </div>

                <div className="my-4">
                    <Button type="submit" disabled={processing}>
                        {processing ? <Spinner /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateExpense;

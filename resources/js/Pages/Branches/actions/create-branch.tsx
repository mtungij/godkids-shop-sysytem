import FormModal from "@/components/form/form-modal";
import KdTextInput from "@/components/form/kd-text-input";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const CreateBranchAction = () => {
    const { data, setData, errors, post, reset, processing } = useForm({
        name: "",
        phones: "",
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("branches.store"), {
            onSuccess: () => {
                toast.success("Branch created successfully.");
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
            buttonLabel="Add branch"
            id="create-branch-modal"
        >
            <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-1 gap-4">
                <KdTextInput
                    label="Branch name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="branch name"
                />
                <KdTextInput
                    label="Phone number(s)"
                    value={data.phones}
                    onChange={(e) => setData("phones", e.target.value)}
                />
            </div>
        </FormModal>
    );
};

export default CreateBranchAction;

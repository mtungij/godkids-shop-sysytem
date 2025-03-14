import FormModal from "@/components/form/form-modal";
import KdTextInput from "@/components/form/kd-text-input";
import { Branch } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

const UpdateBranchAction = ({ branch }: { branch: Branch }) => {
    const { data, setData, errors, patch, processing } = useForm({
        name: branch.name,
        address: branch.address,
        phones: branch.phones,
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();

        patch(route("branches.update", branch.id), {
            onSuccess: () => {
                toast.success("Branch updated successfully.");
            },
        });
    };
    return (
        <FormModal
            onSubmit={submit}
            processing={processing}
            errors={Object.values(errors)}
            modalTitle="Create new branch"
            buttonLabel=""
            id={`edit-branch${branch.id}-modal`}
            action="update"
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

export default UpdateBranchAction;

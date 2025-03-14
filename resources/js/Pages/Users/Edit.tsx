import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Branch, PageProps, User } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import UserCard from "@/components/user-profile";
import UpdateProfileInformationForm from "../Profile/Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";

export default function Edit({
    mustVerifyEmail,
    status,
    user,
    branches
}: PageProps<{ mustVerifyEmail: boolean; status?: string, user: User, branches: Branch[] }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User details
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="space-y-6">
                <UserCard
                    id={user.id}
                    name={user.name}
                    role={user.role}
                    phone={user.phone}
                    email={user.email}
                    isActive={user.isActive}
                    branch={user.branch?.name}
                    tags={["Selling", "Expenses", "Purchases"]}
                    profileColor="bg-blue-600"
                />
                <div className="mx-auto max-w-full space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            branches={branches}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

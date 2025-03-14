import { Building2, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router, usePage } from "@inertiajs/react";
import { Branch } from "@/types";
import { toast } from "sonner";

export function SwitchBranch() {
    const branches = usePage().props.auth.branches;
    const user = usePage().props.auth.user;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" title="Switch Branch" className={user.role !== 'admin' ? "hidden": ""} >
                    <Building2 />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-sm" align="end">
                {branches.map((branch: Branch) => (
                    <DropdownMenuItem
                        key={branch.id}
                        title={`Switch to ${branch.name}`}
                        onClick={() =>
                            router.post(route("switch-branch", branch.id),{}, {
                                onSuccess: () => {
                                    toast.success(`Switched to ${branch.name}`);
                                },
                                preserveScroll: true,
                                preserveState: true,
                            })
                        }
                    >
                        {branch.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

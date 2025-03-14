import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarItems from "./app-sidebar";

const Sidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <span className="md:hidden rounded-full text-gray-50 size-10 cursor-pointer flex items-center justify-center bg-gray-950 border">
                    <Menu className="size-6" />
                </span>
            </SheetTrigger>
            <SheetContent aria-describedby="sidebar" side={"left"}>
                <SheetHeader>
                    <SheetTitle>Mauzodata </SheetTitle>
                    <SheetDescription>{""}</SheetDescription>
                    <SidebarItems />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;

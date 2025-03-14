import { DataTable } from "@/components/data-table";
import FormModal from "@/components/form/form-modal";
import { Order } from "@/lib/interfaces";
import { editPendingOrderItemsColumns } from "../columns";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { WhenVisible } from "@inertiajs/react";
import Spinner from "@/components/Spinner";
import { useState } from "react";

const EditPendingOrderItems = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState(false);

    const processing = false;
    const errors = {};
    const submit = () => {
        console.log("submit");
    };
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>Edit</DrawerTrigger>
            <DrawerContent className="max-w-6xl ml-auto pb-20">
                <DrawerHeader>
                    <DrawerTitle>Edit Pending Order #{order.invoice_no}</DrawerTitle>
                    <DrawerDescription>
                        Edit the order details below.
                    </DrawerDescription>
                </DrawerHeader>
                <div>
                  {/* <WhenVisible data={"order.order_items"} fallback={<Spinner />}> */}
                    <DataTable
                        columns={editPendingOrderItemsColumns}
                        data={order?.order_items}
                    />
                    {/* </WhenVisible> */}
                </div>

                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default EditPendingOrderItems;

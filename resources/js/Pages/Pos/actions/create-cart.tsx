import { FormEventHandler, useState } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { nowDateTime, numberFormat } from "@/lib/utils";
import { Customer, PaymentMethod, Product } from "@/lib/interfaces";
import FormRepeater from "@/components/ui/form-repeater";
import KdSelectInput from "@/components/form/kd-select-input";
import KdNumericInput from "@/components/form/kd-numeric-input";
import KdSearchSelect from "@/components/form/kd-search-select";
import KdTextInput from "@/components/form/kd-text-input";
import { PlusCircle, ShoppingCart } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Item {
    product_id?: number;
    qty: number;
    buy_price: number;
    whole_stock: number;
    whole_price: number;
    price: number;
    original_price: number;
    total: number;
}

const initialItem: Item = {
    product_id: undefined,
    qty: 1,
    buy_price: 0,
    price: 0,
    whole_price: 0,
    whole_stock: 0,
    original_price: 0,
    total: 0,
};

const CreateCart = ({
    products,
    paymentMethods,
    orderDate,
    invoiceNo,
    customers,
}: {
    products: Product[];
    paymentMethods: PaymentMethod[];
    orderDate: string;
    invoiceNo: string;
    customers: Customer[];
}) => {
    const [items, setItems] = useState<Item[]>([initialItem]);
    const [isProcessing, setIsProcessing] = useState(false);

    const user = usePage().props.auth.user;

    const { data, setData, reset } = useForm({
        customer_id: "",
        payment_method_id: "",
        order_date: nowDateTime(),
        invoice_no: invoiceNo,
        status: "paid",
        customer_name: "",
        customer_contact: "",
        customer_address: "",
    });

    const statuses = [
        { id: "paid", name: "Paid" },
        { id: "pending", name: "Pending" },
        { id: "credit", name: "Credit order" },
    ];

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(
            route("pos.sell"),
            {
                customer_id: data.customer_id,
                payment_method_id: data.payment_method_id,
                order_date: data.order_date,
                invoice_no: data.invoice_no,
                status: data.status,
                customer_name: data.customer_name,
                customer_contact: data.customer_contact,
                customer_address: data.customer_address,
                order_items: items as any,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setIsProcessing(true),
                onFinish: () => setIsProcessing(false),
                onSuccess: () => {
                    toast.success("Purchase order CreateCartd successfully");
                    reset();
                    setItems([initialItem]);
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            }
        );
    };

    return (
        <>
            <div className="space-y-6">
                <h1 className="text-medium bg-cyan-700/50 -mb-6 text-white px-2 py-1">
                    You're selling from ~{" "}
                    <span className="uppercase">{user.branch?.name}</span>
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-white w-full dark:bg-gray-800 p-2 rounded grid items-center lg:grid-cols-2 gap-4">
                        <div className="w-full flex items-center gap-4">
                            <div className="w-full flex items-end">
                                <KdSearchSelect
                                    label="Customer"
                                    data={customers}
                                    value={data.customer_id}
                                    onChange={(e) =>
                                        setData("customer_id", e.target.value)
                                    }
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size={"icon"}>
                                            <PlusCircle className="size-6 mr-1" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">
                                                    Customer details
                                                </h4>
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="width">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="width"
                                                        type="text"
                                                        className="col-span-2 h-8"
                                                        value={
                                                            data.customer_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "customer_name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="contact">
                                                        Contact
                                                    </Label>
                                                    <Input
                                                        id="contact"
                                                        type="text"
                                                        className="col-span-2 h-8"
                                                        value={
                                                            data.customer_contact
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "customer_contact",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 items-center gap-4">
                                                    <Label htmlFor="height">
                                                        Address
                                                    </Label>
                                                    <Input
                                                        id="height"
                                                        type="text"
                                                        className="col-span-2 h-8"
                                                        value={
                                                            data.customer_address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "customer_address",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="w-full">
                                <KdSelectInput
                                    label="Status"
                                    data={statuses}
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <KdSelectInput
                                label="Account"
                                data={paymentMethods}
                                value={data.payment_method_id}
                                onChange={(e) =>
                                    setData("payment_method_id", e.target.value)
                                }
                            />
                            <KdTextInput
                                label="Invoice No"
                                value={data.invoice_no}
                                onChange={(e) =>
                                    setData("invoice_no", e.target.value)
                                }
                                readonly
                            />
                            {/* <KdTextInput
                                type="datetime-local"
                                label="Order Date"
                                value={data.order_date}
                                onChange={(e) =>
                                    setData("order_date", e.target.value)
                                }
                            /> */}
                        </div>
                    </div>

                    <div className="">
                        <div>
                            <div className="space-y-0">
                                <h1 className="text-medium bg-cyan-700/50 px-2 py-1">
                                    Order Items
                                </h1>
                                <FormRepeater<Item>
                                    initialValues={initialItem}
                                    onChange={(updatedItems) =>
                                        setItems(updatedItems)
                                    } // Update the state
                                    renderFields={(
                                        item,
                                        index,
                                        handleChange
                                    ) => (
                                        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
                                            <div>
                                                <KdSearchSelect
                                                    label="Product"
                                                    id={index}
                                                    data={products}
                                                    value={item.product_id?.toString()}
                                                    onChange={(e) => {
                                                        const selectedProduct =
                                                            products.find(
                                                                (product) =>
                                                                    product.id.toString() ===
                                                                    e.target
                                                                        .value
                                                            );
                                                        if (selectedProduct) {
                                                            handleChange(
                                                                index,
                                                                undefined,
                                                                {
                                                                    product_id:
                                                                        selectedProduct.id,
                                                                    buy_price:
                                                                        selectedProduct.buy_price,
                                                                    whole_stock:
                                                                        selectedProduct.whole_stock,
                                                                    whole_price:
                                                                        selectedProduct.whole_price,
                                                                    price: selectedProduct.sell_price,
                                                                    original_price:
                                                                        selectedProduct.sell_price,
                                                                    total:
                                                                        selectedProduct.sell_price *
                                                                        item.qty,
                                                                }
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-full">
                                                    <KdTextInput
                                                        label="Qty"
                                                        type="number"
                                                        id={index}
                                                        value={item.qty.toString()}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                index,
                                                                undefined,
                                                                {
                                                                    qty: parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                                    price:
                                                                        parseFloat(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) > 0 &&
                                                                        item.whole_stock >
                                                                            0 &&
                                                                        parseFloat(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) >=
                                                                            item.whole_stock
                                                                            ? item.whole_price
                                                                            : item.original_price,
                                                                    total:
                                                                        (parseFloat(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) > 0 &&
                                                                        item.whole_stock >
                                                                            0 &&
                                                                        parseFloat(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) >=
                                                                            item.whole_stock
                                                                            ? item.whole_price
                                                                            : item.original_price) *
                                                                        parseFloat(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                }
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <KdNumericInput
                                                        label="Price"
                                                        id={index}
                                                        value={item.price.toString()}
                                                        readonly={
                                                            user.role !==
                                                            "admin"
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                index,
                                                                "price",
                                                                e.target
                                                                    .value as any
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <KdNumericInput
                                                        label="Total"
                                                        id={index}
                                                        value={item.total.toString()}
                                                        readonly={true}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                index,
                                                                "total",
                                                                e.target
                                                                    .value as any
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="flex justify-between items-center gap-2 py-3 px-2 bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-bold">
                                Total{" "}
                                <NumberFlow
                                    value={items.reduce(
                                        (acc, item) =>
                                            acc + item.price * item.qty,
                                        0
                                    )}
                                    className="text-lg text-green-500 font-bold"
                                />
                            </h2>
                            <div className="flex items-center gap-2">
                                <Button type="submit" disabled={isProcessing}>
                                    <ShoppingCart />
                                    {isProcessing
                                        ? "Processing..."
                                        : "Sell produts"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateCart;

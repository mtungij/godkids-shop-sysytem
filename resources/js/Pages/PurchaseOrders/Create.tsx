import { FormEventHandler, useState } from "react";
import { Deferred, Head, Link, router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { nowDateTime } from "@/lib/utils";
import { PaymentMethod, Product, Supplier } from "@/lib/interfaces";
import FormRepeater from "@/components/ui/form-repeater";
import KdSelectInput from "@/components/form/kd-select-input";
import KdNumericInput from "@/components/form/kd-numeric-input";
import KdSearchSelect from "@/components/form/kd-search-select";
import KdTextInput from "@/components/form/kd-text-input";
import NumberFlow from "@number-flow/react";
import CreateSupplier from "../Suppliers/actions/create-supplier";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Branch } from "@/types";
import Spinner from "@/components/Spinner";
import { Loader } from "lucide-react";

interface Item {
    product_id?: number;
    qty: number;
    buy_price: number;
    sell_price: number;
    total: number;
}

const initialItem: Item = {
    product_id: undefined,
    qty: 1,
    buy_price: 0,
    sell_price: 0,
    total: 0,
};

const Create = ({
    products,
    paymentMethods,
    suppliers,
    reference,
    branches,
}: {
    products: Product[];
    paymentMethods: PaymentMethod[];
    orderDate: string;
    reference: string;
    suppliers: Supplier[];
    branches: Branch[];
}) => {
    const [items, setItems] = useState<Item[]>([initialItem]);
    const [isProcessing, setIsProcessing] = useState(false);

    const { data, setData, errors, post, processing, reset } = useForm({
        supplier_id: "",
        payment_method_id: "",
        purchase_date: nowDateTime(),
        branch_id: "",
        reference: reference,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(
            route("purchases.store"),
            {
                supplier_id: data.supplier_id,
                payment_method_id: data.payment_method_id,
                purchase_date: data.purchase_date,
                branch_id: data.branch_id,
                reference: data.reference,
                items: items as any,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setIsProcessing(true),
                onFinish: () => setIsProcessing(false),
                onSuccess: () => {
                    toast.success("Purchase order Created successfully");
                    reset();
                    setItems([initialItem]);
                },
                onError: (errors) => {
                    toast.error("Something went wrong");
                    console.log(errors);
                },
            }
        );
    };

    return (
        <Authenticated header={<h2 className="page-head">Create purchase </h2>}>
            <Head title="Make purchase" />
            <section className="space-y-6 mb-16 mt-4">
                <Deferred
                    data={["products", "suppliers", "reference", "branches"]}
                    fallback={<Spinner />}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="bg-white w-full dark:bg-gray-800 p-2 rounded grid items-center lg:grid-cols-2 gap-4">
                            <div className="w-full flex items-center gap-4">
                                <div className="w-full flex items-end">
                                    <KdSelectInput
                                        label="supplier"
                                        data={suppliers}
                                        value={data.supplier_id}
                                        onChange={(e) =>
                                            setData(
                                                "supplier_id",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <CreateSupplier />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                <KdSelectInput
                                    label="Account"
                                    data={paymentMethods}
                                    value={data.payment_method_id}
                                    onChange={(e) =>
                                        setData(
                                            "payment_method_id",
                                            e.target.value
                                        )
                                    }
                                />
                                {/* <KdSelectInput
                                    label="Branch"
                                    data={branches}
                                    value={data.branch_id}
                                    onChange={(e) => {
                                        setData("branch_id", e.target.value);
                                        router.get(
                                            route("purchases.create"),
                                            {
                                                branch_id: e.target.value,
                                            },
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    }}
                                /> */}
                                <KdTextInput
                                    label="Reference ID"
                                    value={data.reference}
                                    onChange={(e) =>
                                        setData("reference", e.target.value)
                                    }
                                />

                                <KdTextInput
                                    type="datetime-local"
                                    label="Order Date"
                                    value={data.purchase_date}
                                    onChange={(e) =>
                                        setData("purchase_date", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="">
                            <div>
                                <div className="space-y-4">
                                    <h1 className="text-xl font-semibold mb-4">
                                        Add Items
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
                                                            if (
                                                                selectedProduct
                                                            ) {
                                                                handleChange(
                                                                    index,
                                                                    undefined,
                                                                    {
                                                                        product_id:
                                                                            selectedProduct.id,
                                                                        buy_price:
                                                                            selectedProduct.buy_price,
                                                                        sell_price: selectedProduct.sell_price,
                                                                        total:
                                                                            selectedProduct.buy_price *
                                                                            item.qty,
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-full">
                                                        <KdNumericInput
                                                            label="Qty"
                                                            id={index}
                                                            value={item.qty.toString()}
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    index,
                                                                    undefined,
                                                                    {
                                                                        qty: parseFloat(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                        total:
                                                                            item.buy_price *
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
                                                            label="Buying Price"
                                                            id={index}
                                                            value={item.buy_price.toString()}
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    index,
                                                                    "buy_price",
                                                                    e.target
                                                                        .value as any
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <KdNumericInput
                                                            label="Sell Price"
                                                            id={index}
                                                            value={item.sell_price.toString()}
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    index,
                                                                    "sell_price",
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

                        <div className=" bg-white dark:bg-gray-800 p-2 rounded">
                            <div className="flex justify-between items-center gap-2 pt-4">
                                <h2 className="text-lg font-bold">
                                    Total{" "}
                                    <NumberFlow
                                        value={Number(items.reduce(
                                            (acc, item) =>
                                                acc +
                                                Number(item.buy_price) * Number(item.qty),
                                            0
                                        ))}
                                        className="text-lg text-green-500 font-bold"
                                    />
                                </h2>
                                <div className="flex items-center gap-2">
                                    {/* <Button type="button" variant={'destructive'} size={'icon'} onClick={() => setItems([])}>
                                    <Trash2 className="size-6" />
                                </Button> */}
                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing
                                            ? <span className="flex items-center">
                                                <Loader className="size-4 mr-2 animate-spin" />
                                                Processing...
                                            </span>
                                            : "Create Purchase"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Deferred>
            </section>
        </Authenticated>
    );
};

export default Create;

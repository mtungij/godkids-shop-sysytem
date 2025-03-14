import FileUploader from "@/components/file-upload";
import FormModal from "@/components/form/form-modal";
import KdNumericInput from "@/components/form/kd-numeric-input";
import KdTextInput from "@/components/form/kd-text-input";
import { FileWithPreview } from "@/components/image-cropper";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

const CreateProduct = () => {
    const [selectedFile, setSelectedFile] =
        useState<FileWithPreview | null>(null)
  const [isDialogOpen, setDialogOpen] = useState(false)
  
    const { data, post, setData, processing, errors, reset } = useForm({
        name: "",
        unit: "",
        buy_price: "",
        sell_price: "",
        stock: "",
        stock_alert: "",
        expire_date: "",
        whole_price: "0",
        img: selectedFile,
        whole_stock: "0.00",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("products.store"), {
            onSuccess: () => {
                toast.success("Created successfully.");
                reset();
            },
        });
    };

    console.log(selectedFile);
    
    return (
        <Authenticated>
            <form onSubmit={submit} encType="multipart/form-data">
                <div className="p-4"
                >
                    <div className="p-4 overflow-y-auto scroll-bar grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <KdTextInput
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Product name"
                        />
                        <KdTextInput
                            label="Unit"
                            value={data.unit}
                            onChange={(e) => setData("unit", e.target.value)}
                            placeholder="unit"
                        />
                        <KdNumericInput
                            label="Buying price"
                            type="number"
                            value={data.buy_price}
                            onChange={(e) => setData("buy_price", e.target.value)}
                        />
                        <KdNumericInput
                            label="Selling price"
                            type="number"
                            value={data.sell_price}
                            onChange={(e) => setData("sell_price", e.target.value)}
                            placeholder=""
                        />
                        <KdNumericInput
                            label="Stock"
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                        />
                        <KdNumericInput
                            label="Stock alert"
                            type="number"
                            value={data.stock_alert}
                            onChange={(e) => setData("stock_alert", e.target.value)}
                        />
                        <KdTextInput
                            label="Expire date"
                            type="date"
                            value={data.expire_date}
                            onChange={(e) => setData("expire_date", e.target.value)}
                        />
                        <KdNumericInput
                            label="Wholesale price"
                            type="number"
                            value={data.whole_price}
                            onChange={(e) => setData("whole_price", e.target.value)}
                        />
                        <KdNumericInput
                            label="Wholesale stock"
                            type="number"
                            value={data.whole_stock}
                            onChange={(e) => setData("whole_stock", e.target.value)}
                        />
                        <FileUploader selectedFile={selectedFile} setSelectedFile={setSelectedFile} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
                    </div>
                </div>

                <div className="my-3">
                    <Button type="submit" className="">Submit</Button>
                </div>
            </form>
        </Authenticated>
    );
};

export default CreateProduct;

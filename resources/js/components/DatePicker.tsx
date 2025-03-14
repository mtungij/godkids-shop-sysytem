import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, Filter, ListRestart, Printer } from "lucide-react";
import { router } from "@inertiajs/react";
import KdTextInput from "./form/kd-text-input";

export function DateRangePicker({
    from,
    to,
    url,
    downloadPdfUrl,
    downloadExcelUrl,
}: {
    from: string;
    to: string;
    url: string;
    downloadPdfUrl?: string;
    downloadExcelUrl?: string;
}) {
    const [fromDate, setFromDate] = React.useState(from);
    const [toDate, setToDate] = React.useState(to);

    return (
        <div className={cn("flex items-end gap-2 flex-col md:flex-row")}>
            <div className="flex items-center w-full gap-2">
                <KdTextInput
                    label=""
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
                <KdTextInput
                    label=""
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
            </div>

            <div className="flex w-full items-center justify-start gap-2">
                <Button
                    size={"icon"}
                    type="button"
                    onClick={() => {
                        router.get(url, {
                            startDate: new Date(fromDate),
                            endDate: new Date(toDate),
                        });
                    }}
                >
                    <Filter className="h-4 w-4" />
                </Button>

                <Button
                    variant={"outline"}
                    onClick={() => router.visit(url)}
                    type="button"
                >
                    <ListRestart className="size-4" />
                    Reset
                </Button>

                {downloadExcelUrl && (
                    <Button
                        variant={"outline"}
                        type="button"
                        title="downlad excel"
                        asChild
                    >
                        <a
                            href={`${downloadExcelUrl}?startDate=${from}&endDate=${to}`}
                            className="flex items-center gap-1"
                        >
                            <Download className="size-4" />
                            Excel
                        </a>
                    </Button>
                )}

                {downloadPdfUrl && (
                    <Button
                        variant={"outline"}
                        title="downlad pdf"
                        type="button"
                        asChild
                    >
                        <a
                            href={`${downloadPdfUrl}?startDate=${from}&endDate=${to}`}
                            className="flex items-center gap-1"
                        >
                            <Printer className="size-4" />
                            PDF
                        </a>
                    </Button>
                )}
            </div>
        </div>
    );
}

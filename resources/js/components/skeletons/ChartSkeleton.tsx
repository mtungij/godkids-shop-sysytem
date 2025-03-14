import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ChartSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></CardTitle>
                <CardDescription className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mt-2 animate-pulse"></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </CardFooter>
        </Card>
    );
}

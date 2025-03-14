import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { numberFormat } from "@/lib/utils"

export interface chartData {
    date: string,
    aggregate: number
}

const chartConfig = {
  aggregate: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SalesChart({ chartData }: { chartData: chartData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mothly Sales</CardTitle>
        <CardDescription>January - December {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent label={'Sales'} />}
              formatter={(value: number) => `TZS ${numberFormat(value)}`}
            />
            <Bar dataKey="aggregate" label="Sales" fill="var(--color-aggregate)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}

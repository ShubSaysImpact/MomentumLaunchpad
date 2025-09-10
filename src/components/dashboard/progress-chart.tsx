
"use client"

import * as React from "react"
import { Label, PolarGrid, RadialBar, RadialBarChart, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { useAppContext } from "@/context/app-context"
import { Goal, Task } from "@/lib/types"

const chartConfig = {
  clarity: {
    label: "Clarity",
    color: "hsl(var(--chart-1))",
  },
  traction: {
    label: "Traction",
    color: "hsl(var(--chart-2))",
  },
  monetisation: {
    label: "Monetisation",
    color: "hsl(var(--chart-3))",
  },
} satisfies React.ComponentProps<typeof ChartContainer>["config"]

export function ProgressChart() {
  const { goals, tasks, loading } = useAppContext();
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [totalProgress, setTotalProgress] = React.useState(0);
  const [clarityProgress, setClarityProgress] = React.useState(0);
  const [tractionProgress, setTractionProgress] = React.useState(0);
  const [monetisationProgress, setMonetisationProgress] = React.useState(0);

  React.useEffect(() => {
    if (loading) return;

    const allItems: (Task | Goal)[] = [...tasks, ...goals];
    
    const domains = ["Clarity", "Traction", "Monetisation"];
    const progressData = domains.map(domain => {
      const domainItems = allItems.filter(item => item.domain === domain);
      const completedItems = domainItems.filter(item => item.completed);
      const progress = domainItems.length > 0 ? (completedItems.length / domainItems.length) * 100 : 0;
      return {
        name: domain,
        progress: progress,
        fill: `hsl(var(--chart-${domains.indexOf(domain) + 1}))`,
      };
    });

    const clarityData = progressData.find(d => d.name === 'Clarity');
    const tractionData = progressData.find(d => d.name === 'Traction');
    const monetisationData = progressData.find(d => d.name === 'Monetisation');
    
    setClarityProgress(clarityData ? clarityData.progress : 0);
    setTractionProgress(tractionData ? tractionData.progress : 0);
    setMonetisationProgress(monetisationData ? monetisationData.progress : 0);
    
    setChartData([
        {
            name: "Progress",
            clarity: clarityData?.progress || 0,
            traction: tractionData?.progress || 0,
            monetisation: monetisationData?.progress || 0
        }
    ]);

    const totalItems = allItems.filter(item => item.domain !== "Global");
    const completedItems = totalItems.filter(item => item.completed);
    const overallProgress = totalItems.length > 0 ? (completedItems.length / totalItems.length) * 100 : 0;
    setTotalProgress(overallProgress);

  }, [goals, tasks, loading]);


  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progress Overview</CardTitle>
          <CardDescription>Loading progress data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center pb-0 h-60">
            <div className="animate-pulse w-48 h-48 rounded-full bg-muted"></div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
           <div className="flex items-center gap-2 font-medium leading-none">Loading...</div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Progress Overview</CardTitle>
        <CardDescription>Your progress across key domains</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={360}
            innerRadius="15%"
            outerRadius="100%"
            barSize={12}
            >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="hsl(var(--border))"
              className="fill-none"
              polarRadius={[88, 76, 64]}
            />
            <RadialBar dataKey="monetisation" background cornerRadius={10} stackId="a" />
            <RadialBar dataKey="traction" background cornerRadius={10} stackId="a" />
            <RadialBar dataKey="clarity" background cornerRadius={10} stackId="a" />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                />
             <ChartLegend content={<ChartLegendContent nameKey="name" />} className="-translate-y-4 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center" />
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {totalProgress.toFixed(0)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground"
                      >
                        Total
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          Progress tracked across all domains
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Keep up the momentum!
        </div>
      </CardFooter>
    </Card>
  )
}

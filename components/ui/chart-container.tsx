"use client";

import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer as ShadCNChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InfoIcon, ChevronDownIcon } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const stakedTokensData = [
  {
    date: "Jul 8",
    eth: 34,
    steth: 28,
    meth: 22,
    eigen: 20,
    sweth: 18,
    ethx: 16,
    wbeth: 14,
    reth: 12,
    oseth: 10,
    cbeth: 8,
  },
  {
    date: "Sep 21",
    eth: 38,
    steth: 30,
    meth: 24,
    eigen: 22,
    sweth: 20,
    ethx: 18,
    wbeth: 16,
    reth: 14,
    oseth: 12,
    cbeth: 10,
  },
];

export default function ChartContainer() {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="border-b p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-base font-medium text-muted-foreground">
                Total Staked Tokens
              </CardTitle>
              <button className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground">
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Info</span>
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <Menubar className="border-none bg-accent/50">
              <MenubarMenu>
                <MenubarTrigger className="bg-background data-[state=open]:bg-background">
                  All Assets
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-muted-foreground">
                  ETH Based Assets
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-muted-foreground">
                  BTC Based Assets
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-muted-foreground">
                  EIGEN
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-muted-foreground">
                  Stablecoins
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Asset:</span>
                <button className="inline-flex h-8 items-center justify-center rounded-md border border-input px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  All Assets
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Timespan:</span>
                <button className="inline-flex h-8 items-center justify-center rounded-md border border-input px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  3M
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <ShadCNChartContainer
              config={{
                eth: { label: "ETH", color: "hsl(var(--chart-1))" },
                steth: { label: "stETH", color: "hsl(var(--chart-2))" },
                meth: { label: "mETH", color: "hsl(var(--chart-3))" },
                eigen: { label: "EIGEN", color: "hsl(var(--chart-4))" },
                sweth: { label: "swETH", color: "hsl(var(--chart-5))" },
                ethx: { label: "ETHx", color: "hsl(var(--chart-6))" },
                wbeth: { label: "wBETH", color: "hsl(var(--chart-7))" },
                reth: { label: "rETH", color: "hsl(var(--chart-8))" },
                oseth: { label: "osETH", color: "hsl(var(--chart-9))" },
                cbeth: { label: "cbETH", color: "hsl(var(--chart-10))" },
              }}
              className="h-[400px]"
            >
              <AreaChart data={stakedTokensData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) => `$${value}B`}
                  label={{
                    value: "TOTAL DELEGATION STAKE",
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [`$${value}`, name]}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="eth"
                  stackId="1"
                  stroke="var(--color-eth)"
                  fill="var(--color-eth)"
                />
                <Area
                  type="monotone"
                  dataKey="steth"
                  stackId="1"
                  stroke="var(--color-steth)"
                  fill="var(--color-steth)"
                />
                <Area
                  type="monotone"
                  dataKey="meth"
                  stackId="1"
                  stroke="var(--color-meth)"
                  fill="var(--color-meth)"
                />
                <Area
                  type="monotone"
                  dataKey="eigen"
                  stackId="1"
                  stroke="var(--color-eigen)"
                  fill="var(--color-eigen)"
                />
                <Area
                  type="monotone"
                  dataKey="sweth"
                  stackId="1"
                  stroke="var(--color-sweth)"
                  fill="var(--color-sweth)"
                />
                <Area
                  type="monotone"
                  dataKey="ethx"
                  stackId="1"
                  stroke="var(--color-ethx)"
                  fill="var(--color-ethx)"
                />
                <Area
                  type="monotone"
                  dataKey="wbeth"
                  stackId="1"
                  stroke="var(--color-wbeth)"
                  fill="var(--color-wbeth)"
                />
                <Area
                  type="monotone"
                  dataKey="reth"
                  stackId="1"
                  stroke="var(--color-reth)"
                  fill="var(--color-reth)"
                />
                <Area
                  type="monotone"
                  dataKey="oseth"
                  stackId="1"
                  stroke="var(--color-oseth)"
                  fill="var(--color-oseth)"
                />
                <Area
                  type="monotone"
                  dataKey="cbeth"
                  stackId="1"
                  stroke="var(--color-cbeth)"
                  fill="var(--color-cbeth)"
                />
              </AreaChart>
            </ShadCNChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

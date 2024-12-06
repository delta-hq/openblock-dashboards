import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import { Provider } from "@/providers/index";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import { overviewRequest } from "../hooks/use-overview";
import { OverviewCard } from "@/components/ui/overview-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await overviewRequest();
  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <SidebarHeader>
          <Image
            className="dark:invert"
            priority
            src="/openblocklabs-logo.svg"
            alt="OpenBlockLabs Logo"
            width={100}
            height={100}
          />
        </SidebarHeader>
      </Sidebar>
      <main className="flex-1 overflow-auto">
        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map((card) => (
            <OverviewCard key={card.title} title={card.title}>
              <div className="text-2xl font-bold">{card.metric}</div>
              <p className="text-xs text-green-400">+2.0% from last month</p>
            </OverviewCard>
          ))}
        </div>
        {children}
      </main>
    </div>
  );
}

import { trpc, HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomeClientScreen from "../components/ui/HomeClientScreen";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Home() {
  void trpc.hello.prefetch({
    text: "server",
  });

  void trpc.overview.prefetch();

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">EigenLayer</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Restaking</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeClientScreen />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

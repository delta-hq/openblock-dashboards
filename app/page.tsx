import { trpc, HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomeClientScreen from "../components/ui/HomeClientScreen";
import { useOverview } from "./hooks/use-overview";
import { OverviewCard } from "@/components/ui/overview-card";

export default async function Home() {
  void trpc.hello.prefetch({
    text: "server",
  });

  void trpc.overview.prefetch();

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const { data } = await useOverview();

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map((card) => (
            <OverviewCard key={card.title} title={card.title}>
              <div className="text-2xl font-bold">{card.metric}</div>
              <p className="text-xs text-green-400">+2.0% from last month</p>
            </OverviewCard>
          ))}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeClientScreen />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

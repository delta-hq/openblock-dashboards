import { trpc, HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomeClientScreen from "../components/ui/HomeClientScreen";

export default async function Home() {
  void trpc.hello.prefetch({
    text: "server",
  });

  void trpc.overview.prefetch()

  const greeting = await trpc.hello({ text: "server" });
  const overview = await trpc.overview();

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <p>{greeting.greeting}</p>
          <HomeClientScreen />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

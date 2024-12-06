// import type { AppType } from "./api/[[...route]]/route";
// import { hc } from "hono/client";
import { trpc, HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomeClientScreen from "../components/ui/HomeClientScreen";

export default async function Home() {
  void trpc.hello.prefetch({
    text: "server",
  });

  const greeting = await trpc.hello({ text: "server" });

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

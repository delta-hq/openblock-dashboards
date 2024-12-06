"use client";

import React from "react";
import { ModeToggle } from "./theme-toggle";
import { trpc } from "@/trpc/client";

export default function HomeClientScreen() {
  const [data] = trpc.overview.useSuspenseQuery();
  const greeting = trpc.hello.useQuery({
    text: "client",
  });

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <ModeToggle />
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start"></main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
    </div>
  );
}

import * as React from "react";
import { TRPCProvider } from "@/trpc/client";
import { ThemeProvider } from "./ThemeProvider";

const compose = (providers: React.FC<{ children: React.ReactNode }>[]) =>
  providers.reduce((Prev, Curr) => ({ children }) => {
    const Provider = Prev ? (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ) : (
      <Curr>{children}</Curr>
    );
    return Provider;
  });

const Providers = compose([ThemeProvider, TRPCProvider]);

export function Provider({ children }: { readonly children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}

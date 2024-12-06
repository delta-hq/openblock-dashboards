"use client";
import {
  CardConfig,
  transformDataToCard,
} from "@/transform/overview-transform";
import { dashboardConfig, ConfigSchema } from "@/constants/user-config";
import { trpc } from "@/trpc/client";

export async function useOverviewClient() {
  const apiData = trpc.overview.useQuery();
  const [response] = apiData.data ?? [];
  const configData = ConfigSchema.parse(dashboardConfig);

  const data = configData.block.cards.map(
    (cardConfig: CardConfig<typeof response>) => {
      return transformDataToCard(response, cardConfig);
    },
  );

  return { data };
}

import {
  CardConfig,
  transformDataToCard,
} from "@/transform/overview-transform";
import { config, ConfigSchema } from "@/constants/user-config";
import React from "react";
import { trpc } from "@/trpc/server";

export async function useOverview() {
  const apiData = await trpc.overview();
  const [response] = apiData ?? [];
  const configData = ConfigSchema.parse(config);

  const data = configData.block.cards.map(
    (cardConfig: CardConfig<typeof response>) => {
      return transformDataToCard(response, cardConfig);
    },
  );

  return { data };
}

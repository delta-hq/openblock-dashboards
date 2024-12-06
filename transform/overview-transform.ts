import { z } from "zod";

export const IconSchema = z.object({
  icon: z.string(),
  tooltip: z.string(),
});

const OverviewResponseFields = [
  "avs_count",
  "delegated_eigen",
  "delegated_eth",
  "delegated_usd",
  "eigen_shared_security",
  "eth_shared_security",
  "operator_count",
  "staked_usd",
  "staker_count",
  "top_asset",
  "top_asset_marketshare",
  "top_operator_entity",
  "top_operator_entity_marketshare",
  "weighted_avg_avs_count",
] as const;

export const CardSchema = z.object({
  title: z.string().min(1).max(100),
  icon: IconSchema.optional(),
  metric: z.number().transform((val) => Number(val.toFixed(2))),
});

export interface CardConfig<T extends Record<string, unknown>> {
  data_field: keyof T;
  title: string;
  icon?: z.infer<typeof IconSchema>;
}

export function transformDataToCard<T extends Record<string, unknown>>(
  apiData: T,
  cardConfig: CardConfig<T>,
) {
  const { data_field, title, icon } = cardConfig;

  // Validate and transform the metric
  // There are string value in the API response we need to account for
  const metricSchema = z.number().transform((val) => Number(val.toFixed(2)));
  const metricValue = apiData[data_field];
  const metricResult = metricSchema.safeParse(metricValue);

  if (!metricResult.success) {
    throw new Error(
      `Metric validation failed for field "${String(data_field)}": ${
        metricResult.error.message
      }`,
    );
  }

  const data = {
    title,
    icon,
    metric: apiData[data_field],
  };

  return CardSchema.parse(data);
}

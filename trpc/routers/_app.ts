import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const REST_URI = Object.freeze({
  eigenlayer: {
    overview: "eigenlayer/overview_data_latest_fe",
    shared_security_daily: "eigenlayer/shared_security_daily_fe",
    active_restakers_daily: "eigenlayer/active_restakers_daily_fe",
    shares_avs_count: "eigenlayer/shares_avs_count_bucket_daily_fe",
    programmatic_rewards: "eigenlayer/programmatic_rewards_daily_apr_fe",
    staked_strategy_shares: "eigenlayer/staked_strategy_shares_daily_fe",
    rewards_apr_table: "eigenlayer/rewards_apr_table_fe",
  },
} as const);

export const OverViewResponseSchema = z.array(
  z.object({
    avs_count: z.number(),
    delegated_eigen: z.number(),
    delegated_eth: z.number(),
    delegated_usd: z.number(),
    eigen_shared_security: z.number(),
    eth_shared_security: z.number(),
    operator_count: z.number(),
    staked_usd: z.number(),
    staker_count: z.number(),
    top_asset: z.string(),
    top_asset_marketshare: z.number(),
    top_operator_entity: z.string(),
    top_operator_entity_marketshare: z.number(),
    weighted_avg_avs_count: z.number(),
  }),
);

/**
 * Fetches the latest overview data from the Eigen Layer API.
 * @see https://www.data-openblocklabs.com/eigenlayer/overview_data_latest_fe
 * @returns {Promise<z.SafeParseReturnType<z.infer<typeof ApiResponseSchema>, z.infer<typeof ApiResponseSchema>>>} A promise that resolves to the parsed API response
 * @throws {Error} If the API response is not ok
 * @throws {z.ZodError} If the response fails schema validation
 *
 * @example
 * // Example of the expected JSON response structure:
 * [
 *   {
 *     "avs_count": 10,
 *     "delegated_eigen": 1000000,
 *     "delegated_eth": 500,
 *     "delegated_usd": 1500000,
 *     "eigen_shared_security": 0.75,
 *     "eth_shared_security": 0.25,
 *     "operator_count": 100,
 *     "staked_usd": 2000000,
 *     "staker_count": 5000,
 *     "top_asset": "ETH",
 *     "top_asset_marketshare": 0.6,
 *     "top_operator_entity": "Operator XYZ",
 *     "top_operator_entity_marketshare": 0.15,
 *     "weighted_avg_avs_count": 8.5
 *   }
 * ]
 */
export async function getOverview() {
  const res = await fetch(
    `${process.env.REST_API_URL}/${REST_URI.eigenlayer.overview}`,
  );

  if (!res.ok) {
    throw new Error(`API response was not ok: ${res.statusText}`);
  }

  const apiJsonData = await res.json();
  return OverViewResponseSchema.parse(apiJsonData);
}

export const appRouter = createTRPCRouter({
  overview: baseProcedure.query(async () => {
    const response = await getOverview();
    return response;
  }),
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

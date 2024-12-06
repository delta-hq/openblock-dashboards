import { z } from "zod";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

// TODO: Issue with nextjs import in app dir.
// need to refactor will remove once data is pulled from graphql api
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

const dataFieldEnum = z.enum(OverviewResponseFields);

export const IconSchema = z.object({
  icon: z.string(),
  tooltip: z.string(),
});

// const chartConfigSchema = z.object({
//   daily_active_restakers: z.object({
//     label: z.string(),
//     color: z.string(),
//   }),
// }) satisfies z.ZodType<ChartConfig>;

export const RewardsAprTableConfig = {
  title: "Rewards APR Table",
  headers: [
    { label: "Strategy Token", key: "strategy_token" },
    { label: "Total Delegated Stake", key: "total_delegated_stake" },
    { label: "Rewards Paid (Stakers)", key: "rewards_paid_stakers" },
    { label: "Programmatic APR", key: "programmatic_apr" },
    { label: "AVS APR", key: "avs_apr" },
    { label: "Max APR", key: "max_apr" },
    { label: "Top AVS", key: "top_avs" },
  ],
  footer: [],
};

const TabSchema = z.object({
  title: z.string(),
  components: z.array(z.string()),
});

export const ConfigSchema = z.object({
  header: z.object({
    icon: z.string(),
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(150, "Title too long"),
    subtitle: z.string(),
    description: z.string(),
  }),
  block: z.object({
    title: z.string(),
    // This should be an enum of valid time options
    timespan: z.object({
      title: z.string(),
      // Should be an enum of range options
      // 24HR, 7D, 30D, ALL TIME
      range: z.number(),
    }),
    cards: z.array(
      z.object({
        title: z
          .string()
          .min(1, "Title cannot be empty")
          .max(100, "Title too long"),
        icon: IconSchema.optional(),
        data_field: dataFieldEnum, // Now restricted to valid keys
      }),
    ),
  }),
  // charts: z.array(
  //   z.object({
  //     title: z.string(),
  //     config: chartConfigSchema,
  //     x_axis: z.object({
  //       title: z.string(),
  //       label_format: z.string(),
  //       label_format_uppercase: z.boolean().optional(),
  //     }),
  //   }),
  // ),
  // tables: z.object({
  //   table: z.object({
  //     title: z.string(),
  //     headers: z.array(
  //       z.object({
  //         label: z.string(),
  //         key: z.string(),
  //         className: z.string().optional(),
  //       }),
  //     ),
  //     footer: z
  //       .array(
  //         z.object({
  //           label: z.string(),
  //           key: z.string(),
  //           className: z.string().optional(),
  //         }),
  //       )
  //       .optional(),
  //   }),
  // }),
  // // Tabs are optional, if not present render everything normally
  // tabs: z.array(TabSchema).optional(),
});

export const config = {
  header: {
    icon: "https://cdn.prod.website-files.com/64053c5d931f167ecf5997be/6405771ffb64702144b3da4a_el-logo-p-500.png",
    title: "Eigenlayer",
    subtitle: "RESTAKING INSIGHTS",
    description:
      "OpenBlock Labs strategically optimizes restaking by providing advanced security measures, mitigating risks, and enhancing network stability to facilitate Eigenlayer’s efficient expansion.",
  },
  // charts: [
  //   {
  //     // Hard coded Line Chart
  //     title: "Number of Active Restake Delegators",
  //     config: {
  //       daily_active_restakers: {
  //         label: "Active Restakers",
  //         color: "hsl(var(--chart-1))",
  //       },
  //       restaker_inflows: {
  //         label: "Restaker Inflows",
  //         color: "hsl(var(--chart-2))",
  //       },
  //       restaker_outflows: {
  //         label: "Restaker Outflows",
  //         color: "hsl(var(--chart-3))",
  //       },
  //     },
  //     x_axis: {
  //       title: "Date",
  //       label_format: "MMM dd",
  //       label_format_uppercase: false,
  //     },
  //   },
  //   {
  //     // Hard coded Line Chart
  //     title: "RESTAKER INFLOWS /OUTFLOWS",
  //     config: {
  //       restaker_inflows: {
  //         label: "Restaker Inflows",
  //         color: "hsl(var(--chart-2))",
  //       },
  //       restaker_outflows: {
  //         label: "Restaker Outflows",
  //         color: "hsl(var(--chart-3))",
  //       },
  //     },
  //     x_axis: {
  //       title: "Date",
  //       label_format: "MMM dd",
  //       label_format_uppercase: false,
  //     },
  //   },
  //   {
  //     // Hard coded Stacked Area Line Chart
  //     title: "DELEGATED ASSETS TO OPERATORS BY AVS REGISTRATIONS",
  //     config: {
  //       "0_AVS": { label: "0 AVS", color: "hsl(var(--chart-1))" },
  //       "1_AVS": { label: "1 AVS", color: "hsl(var(--chart-2))" },
  //       "2_AVSs": { label: "2 AVSs", color: "hsl(var(--chart-3))" },
  //       "3_AVSs": { label: "3 AVSs", color: "hsl(var(--chart-4))" },
  //       "4_AVSs": { label: "4 AVSs", color: "hsl(var(--chart-5))" },
  //       "5-10_AVSs": { label: "5-10 AVSs", color: "hsl(var(--chart-6))" },
  //       "11-15_AVSs": { label: "11-15 AVSs", color: "hsl(var(--chart-7))" },
  //       ">15_AVSs": { label: ">15 AVSs", color: "hsl(var(--chart-8))" },
  //     },
  //     x_axis: {
  //       title: "Date",
  //       label_format: "MMM dd",
  //       label_format_uppercase: false,
  //     },
  //   },
  // ],
  block: {
    title: "Eigen Layer",
    timespan: {
      title: "24HR",
      range: 24,
    },
    cards: [
      {
        title: "Active Operators Count",
        icon: {
          icon: "operator_icon.svg",
          tooltip: "Operators running at least one AVS",
        },
        data_field: "operator_count",
      },
      {
        title: "AVS Count",
        data_field: "avs_count",
      },
      {
        title: "Top Asset Market Share",
        data_field: "top_asset_marketshare",
      },
      {
        title: "Total Staked / Delegated (USD)",
        data_field: "staked_usd",
      },
    ],
  },
  // tables: {
  //   table: RewardsAprTableConfig,
  // },
  // tabs: [
  //   {
  //     title: "Ecosystem Overview",
  //     components: ["header", "overview-cards", "active-restakers-chart"],
  //   },
  //   {
  //     title: "Analytics",
  //     components: ["staked-tokens-chart", "restaker-flows-chart"],
  //   },
  // ],
};

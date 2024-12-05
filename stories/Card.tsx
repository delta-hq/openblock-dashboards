import { OverviewCard } from "@/components/ui/overview-card";

export function CardDemo() {
  return (
    <OverviewCard title="Total Staked/Delegated (USD)">
      <div className="text-2xl font-bold">$2.21B</div>
      <p className="text-xs text-green-400">+2.0% from last month</p>
    </OverviewCard>
  );
}

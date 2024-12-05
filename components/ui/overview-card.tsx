import React from "react";
import { InfoIcon as InfoCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function OverviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <InfoCircle className="h-4 w-4" />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function IdealCustomerAvatar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ideal Customer Avatar</CardTitle>
        <CardDescription>
          Define your target audience to refine your messaging and strategy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="pain-points" className="text-sm font-medium">Pain Points & Language</label>
          <Textarea id="pain-points" placeholder="What are their biggest challenges? What words do they use to describe them?" className="mt-1" />
        </div>
        <div>
          <label htmlFor="valuable-problem" className="text-sm font-medium">Most Valuable Problem</label>
          <Textarea id="valuable-problem" placeholder="What is the single most valuable problem you can solve for them?" className="mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}

// src/components/traction/ideal-customer-avatar.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
          <Label htmlFor="pain-points" className="text-sm font-medium">Key Pain Points</Label>
          <Textarea id="pain-points" placeholder="What are their biggest, most urgent challenges?" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="language-used" className="text-sm font-medium">Language Used</Label>
          <Textarea id="language-used" placeholder="What exact words and phrases do they use to describe their problems and desired outcomes?" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="valuable-problem" className="text-sm font-medium">Most Valuable Problem</Label>
          <Textarea id="valuable-problem" placeholder="What is the single most valuable, high-impact problem you can solve for them?" className="mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}
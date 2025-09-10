// src/components/monetisation/model-of-transformation.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ModelOfTransformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model of Delivering Transformation</CardTitle>
        <CardDescription>
          What is the tangible way you deliver value and results to your clients?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="delivery-model" className="sr-only">Model of Delivery</Label>
          <Textarea id="delivery-model" placeholder="Define the structure of your product or service (e.g., 1-on-1 coaching, group program, digital course, SaaS)." />
        </div>
      </CardContent>
    </Card>
  );
}

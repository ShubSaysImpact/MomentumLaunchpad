"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function Positioning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Positioning</CardTitle>
        <CardDescription>
          Define your unique market position to stand out.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <Textarea placeholder="Your Offer..." />
          <Textarea placeholder="Your Credibility..." />
          <Textarea placeholder="Your Belief..." />
        </div>
        <div className="text-center text-sm text-muted-foreground p-4 border-2 border-dashed rounded-lg">
          Venn Diagram for Offer, Credibility, and Belief coming soon.
        </div>
      </CardContent>
    </Card>
  );
}

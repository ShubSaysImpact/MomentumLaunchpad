"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MonetisationBoard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Strategy</CardTitle>
        <CardDescription>
          This is a space to outline your monetisation models, pricing, and financial projections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Monetisation planning tools coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
}

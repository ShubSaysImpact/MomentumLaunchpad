"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function EvidenceLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence Log</CardTitle>
        <CardDescription>
          Build a repository of social proof with small wins and positive feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="Log testimonials, positive comments, and small victories here..." />
      </CardContent>
    </Card>
  );
}

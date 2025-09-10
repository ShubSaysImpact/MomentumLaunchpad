// src/components/monetisation/boosters-for-conversion.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BoostersForConversion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Boosters for Conversion</CardTitle>
        <CardDescription>
          Specific tactics to increase the likelihood of a client moving through the flow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="marketing" className="text-sm font-medium">Marketing</Label>
          <Textarea id="marketing" placeholder="Tactics that create urgency and desire (e.g., scarcity, social proof, bonuses)." className="mt-1" />
        </div>
        <div>
          <Label htmlFor="educating" className="text-sm font-medium">Educating</Label>
          <Textarea id="educating" placeholder="Tactics that build authority and show value (e.g., webinars, case studies, workshops)." className="mt-1" />
        </div>
        <div>
          <Label htmlFor="onboarding" className="text-sm font-medium">Onboarding</Label>
          <Textarea id="onboarding" placeholder="Tactics for a smooth post-sale experience (e.g., welcome kit, personal video)." className="mt-1" />
        </div>
        <div>
          <Label htmlFor="monitoring" className="text-sm font-medium">Monitoring</Label>
          <Textarea id="monitoring" placeholder="Tactics to ensure client success and support (e.g., check-in calls, progress reports)." className="mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}

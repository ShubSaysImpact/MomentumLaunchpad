// src/components/zone-of-impact/foundational-pillars.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FoundationalPillars() {
  const { watch } = useFormContext();
  const gallupStrengths = watch("gallupStrengths");
  const mission = watch("mission");
  const why = watch("why");

  const isStrengthsFilled = !!gallupStrengths;
  const isMissionFilled = !!mission;
  const isWhyFilled = !!why;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foundational Pillars</CardTitle>
        <CardDescription>
          Your Zone of Impact is where your strengths, mission, and why overlap.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 w-64 mx-auto">
          <div
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full transition-colors duration-300 mix-blend-multiply",
              isStrengthsFilled ? "bg-primary/70" : "bg-muted"
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 left-0 w-40 h-40 rounded-full transition-colors duration-300 mix-blend-multiply",
              isWhyFilled ? "bg-accent/70" : "bg-muted"
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 right-0 w-40 h-40 rounded-full transition-colors duration-300 mix-blend-multiply",
              isMissionFilled ? "bg-chart-3/70" : "bg-muted"
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">
              Zone of Impact
            </span>
          </div>
        </div>
        <div className="mt-6 space-y-2">
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-primary/70 mr-2" />
                <span>Strengths</span>
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-accent/70 mr-2" />
                <span>Your "Why"</span>
            </div>
             <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-chart-3/70 mr-2" />
                <span>Mission & Vision</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

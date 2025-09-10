// src/components/zone-of-impact/foundational-pillars.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FoundationalPillars() {
  const { watch } = useFormContext();
  const gallupStrengths = watch("gallupStrengths");
  const mission = watch("mission");
  const vision = watch("vision");
  const why = watch("why");

  const isStrengthsFilled = !!gallupStrengths;
  const isMissionVisionFilled = !!mission || !!vision;
  const isWhyFilled = !!why;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Foundational Pillars</CardTitle>
        <CardDescription>
          Your Zone of Impact lies at the intersection of your unique strengths, mission, and core motivation.
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
              isMissionVisionFilled ? "bg-chart-3/70" : "bg-muted"
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-foreground">
              Zone of Impact
            </span>
          </div>
        </div>
        <div className="mt-6 space-y-2">
            <div className="flex items-center">
                <div className={cn("w-4 h-4 rounded-full mr-2 transition-colors", isStrengthsFilled ? "bg-primary/70" : "bg-muted")} />
                <span>Gallup Strengths</span>
            </div>
            <div className="flex items-center">
                <div className={cn("w-4 h-4 rounded-full mr-2 transition-colors", isWhyFilled ? "bg-accent/70" : "bg-muted")} />
                <span>Why Discovery</span>
            </div>
             <div className="flex items-center">
                <div className={cn("w-4 h-4 rounded-full mr-2 transition-colors", isMissionVisionFilled ? "bg-chart-3/70" : "bg-muted")} />
                <span>Mission & Vision</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

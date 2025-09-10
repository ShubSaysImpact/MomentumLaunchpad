"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function Positioning() {
  // TODO: Add state to track if textareas are filled and change circle colors
  const isOfferFilled = true;
  const isCredibilityFilled = true;
  const isBeliefFilled = true;

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
        <div className="relative h-64 w-64 mx-auto my-8">
          <div
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full transition-colors duration-300 mix-blend-multiply",
              isOfferFilled ? "bg-primary/70" : "bg-muted"
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 left-0 w-40 h-40 rounded-full transition-colors duration-300 mix-blend-multiply",
              isCredibilityFilled ? "bg-accent/70" : "bg-muted"
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 right-0 w-40 h-40 rounded-full transition-colors duration-300 mix-blend-multiply",
              isBeliefFilled ? "bg-chart-3/70" : "bg-muted"
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">
              Positioning
            </span>
          </div>
        </div>
         <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-primary/70 mr-2" />
                <span>Your Offer</span>
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-accent/70 mr-2" />
                <span>Your Credibility</span>
            </div>
             <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-chart-3/70 mr-2" />
                <span>Your Belief</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

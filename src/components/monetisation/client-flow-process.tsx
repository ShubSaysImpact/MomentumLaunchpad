// src/components/monetisation/client-flow-process.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ClientFlowProcess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Flow Process</CardTitle>
        <CardDescription>
          Map the journey a potential client takes from stranger to paying customer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="discovery" className="text-sm font-medium">Discovery</Label>
          <Textarea id="discovery" placeholder="How do potential clients discover that I or my solution exists? (e.g., social media, podcasts, SEO)" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="capture" className="text-sm font-medium">Capture</Label>
          <Textarea id="capture" placeholder="How do I capture their interest and get permission to contact them? (e.g., newsletter, lead magnet)" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="nurture" className="text-sm font-medium">Nurture</Label>
          <Textarea id="nurture" placeholder="How do I build a relationship and establish trust? (e.g., email sequence, free community)" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="offer" className="text-sm font-medium">Offer and Sale</Label>
          <Textarea id="offer" placeholder="How do I present my offer and make the transaction smooth? (e.g., sales page, discovery call)" className="mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}

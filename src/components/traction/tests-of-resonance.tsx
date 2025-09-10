"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

function ResonanceTestTab() {
    return (
        <div className="space-y-4">
            <Textarea placeholder="Version of your message..." />
            <div className="grid md:grid-cols-3 gap-4">
                <Textarea placeholder="How did you test it?" />
                <Textarea placeholder="What were the results?" />
                <Textarea placeholder="What will you try next?" />
            </div>
        </div>
    )
}

export function TestsOfResonance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tests of Resonance</CardTitle>
        <CardDescription>
          Create a feedback loop to refine your messaging.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="founder-story">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="founder-story">Founder Story</TabsTrigger>
            <TabsTrigger value="idea-pitch">Idea Pitch</TabsTrigger>
            <TabsTrigger value="offer">Offer</TabsTrigger>
          </TabsList>
          <TabsContent value="founder-story" className="pt-4">
            <ResonanceTestTab />
          </TabsContent>
          <TabsContent value="idea-pitch" className="pt-4">
            <ResonanceTestTab />
          </TabsContent>
          <TabsContent value="offer" className="pt-4">
            <ResonanceTestTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

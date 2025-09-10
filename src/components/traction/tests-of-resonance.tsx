// src/components/traction/tests-of-resonance.tsx
"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { ResonanceTest, ResonanceTestData } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
  testMethod: z.string().min(1, "Test method cannot be empty."),
  results: z.string().min(1, "Results cannot be empty."),
  nextSteps: z.string().min(1, "Next steps cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

interface ResonanceTestTabProps {
  category: keyof ResonanceTestData;
  title: string;
}

function ResonanceTestTab({ category, title }: ResonanceTestTabProps) {
  const { resonanceTests, addResonanceTest, loading } = useAppContext();
  const { toast } = useToast();
  const tests = resonanceTests?.[category] ?? [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      testMethod: "",
      results: "",
      nextSteps: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    addResonanceTest(category, data);
    form.reset();
    toast({
      title: "Version Saved!",
      description: `Your new ${title} version has been logged.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg">
             <h3 className="text-lg font-medium">Add New {title} Version</h3>
             <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your {title} Message/Pitch</FormLabel>
                    <FormControl><Textarea placeholder={`The current version of your ${title.toLowerCase()}...`} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="grid md:grid-cols-3 gap-4">
               <FormField
                control={form.control}
                name="testMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you test it?</FormLabel>
                    <FormControl><Textarea placeholder="e.g., Posted on LinkedIn" {...field} /></FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="results"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What were the results?</FormLabel>
                    <FormControl><Textarea placeholder="e.g., 10 likes, 2 comments" {...field} /></FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="nextSteps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What will you try next?</FormLabel>
                    <FormControl><Textarea placeholder="e.g., Refine the opening line" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Save Version</Button>
          </form>
        </Form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Version History</h3>
        {loading ? (
            <p>Loading...</p>
        ) : tests.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
            {[...tests].reverse().map((test, index) => (
              <AccordionItem value={`item-${index}`} key={test.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <span>Version #{tests.length - index}</span>
                    <span className="text-sm text-muted-foreground">{format(new Date(test.createdAt), "PPP")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 px-1">
                    <div>
                      <h4 className="font-semibold">{title} Message</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{test.message}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                       <div>
                         <h4 className="font-semibold">Test Method</h4>
                         <p className="text-sm text-muted-foreground whitespace-pre-wrap">{test.testMethod}</p>
                       </div>
                        <div>
                         <h4 className="font-semibold">Results</h4>
                         <p className="text-sm text-muted-foreground whitespace-pre-wrap">{test.results}</p>
                       </div>
                        <div>
                         <h4 className="font-semibold">Next Steps</h4>
                         <p className="text-sm text-muted-foreground whitespace-pre-wrap">{test.nextSteps}</p>
                       </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No versions saved yet.</p>
        )}
      </div>
    </div>
  );
}

export function TestsOfResonance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tests of Resonance</CardTitle>
        <CardDescription>
          Create a feedback loop to refine your messaging. Log each version, how you tested it, the results, and what you'll try next.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="founderStory">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="founderStory">Founder Story</TabsTrigger>
            <TabsTrigger value="ideaPitch">Idea Pitch</TabsTrigger>
            <TabsTrigger value="offer">Offer</TabsTrigger>
          </TabsList>
          <TabsContent value="founderStory" className="pt-4">
            <ResonanceTestTab category="founderStory" title="Founder Story" />
          </TabsContent>
          <TabsContent value="ideaPitch" className="pt-4">
            <ResonanceTestTab category="ideaPitch" title="Idea Pitch" />
          </TabsContent>
          <TabsContent value="offer" className="pt-4">
            <ResonanceTestTab category="offer" title="Offer" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

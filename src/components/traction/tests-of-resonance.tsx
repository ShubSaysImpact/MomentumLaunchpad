// src/components/traction/tests-of-resonance.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { ResonanceTestData } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";


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
            <div className="space-y-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        ) : (
            <div className="border rounded-lg">
                <Table>
                    {tests.length === 0 && <TableCaption>No versions saved yet.</TableCaption>}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Ver.</TableHead>
                            <TableHead className="w-[120px]">Date</TableHead>
                            <TableHead>Message/Pitch</TableHead>
                            <TableHead>Test Method</TableHead>
                            <TableHead>Results</TableHead>
                            <TableHead>Next Steps</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {[...tests].reverse().map((test, index) => (
                        <TableRow key={test.id}>
                            <TableCell className="font-medium">#{tests.length - index}</TableCell>
                            <TableCell>{format(new Date(test.createdAt), "dd/MM/yy")}</TableCell>
                            <TableCell className="whitespace-pre-wrap">{test.message}</TableCell>
                            <TableCell className="whitespace-pre-wrap">{test.testMethod}</TableCell>
                            <TableCell className="whitespace-pre-wrap">{test.results}</TableCell>
                            <TableCell className="whitespace-pre-wrap">{test.nextSteps}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
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

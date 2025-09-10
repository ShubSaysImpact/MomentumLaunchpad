"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { generateKeyLearningPoints } from "@/ai/flows/generate-key-learning-points-from-reflections";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppContext } from "@/context/app-context";
import { nanoid } from "nanoid";

const formSchema = z.object({
  weeklyGoals: z.string().min(1, "Please describe your weekly goals."),
  successes: z.string().min(1, "Please describe your successes."),
  outcomes: z.string().min(1, "Please describe your outcomes."),
});

type FormValues = z.infer<typeof formSchema>;

export function RetrospectiveForm() {
  const { toast } = useToast();
  const { addLearningPoint } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [learningPoints, setLearningPoints] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weeklyGoals: "",
      successes: "",
      outcomes: "",
    },
  });

  const handleGenerate = async (data: FormValues) => {
    setIsGenerating(true);
    setLearningPoints([]);
    try {
      const result = await generateKeyLearningPoints(data);
      if (result && result.keyLearningPoints) {
        const points = result.keyLearningPoints.split('\n').map(s => s.replace(/^- /, '')).filter(Boolean);
        setLearningPoints(points);
        toast({
          title: "Learnings Generated!",
          description: "Review the key learning points below.",
        });
      }
    } catch (error) {
      console.error("Error generating learning points:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating learning points. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddLearning = (point: string) => {
    addLearningPoint(point);
    toast({
      title: "Learning Added!",
      description: "The key learning has been added to your Learnings board.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Reflection</CardTitle>
        <CardDescription>
          Fill out your reflections for the week to get AI-powered insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-8">
            <FormField
              control={form.control}
              name="weeklyGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Goals</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What were your goals for this week?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="successes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Successes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What went well this week? What are you proud of?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outcomes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outcomes &amp; Challenges</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What were the outcomes? Any challenges or surprises?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Key Learnings
            </Button>
          </form>
        </Form>
        {learningPoints.length > 0 && (
          <Alert className="mt-8">
            <Wand2 className="h-4 w-4" />
            <AlertTitle>Key Learning Points</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 space-y-2">
                {learningPoints.map((point) => (
                  <li key={nanoid()} className="flex justify-between items-center">
                    <span>{point}</span>
                    <Button size="sm" variant="ghost" onClick={() => handleAddLearning(point)}>Add to Learnings</Button>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

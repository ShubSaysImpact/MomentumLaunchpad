"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppContext } from "@/context/app-context";
import { useState } from "react";
import { generateActionableSteps } from "@/ai/flows/generate-actionable-steps-from-inputs";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { nanoid } from "nanoid";

const formSchema = z.object({
  gallupStrengths: z.string().min(1, "Please list your Gallup Strengths."),
  mission: z.string().min(1, "Please enter your mission statement."),
  vision: z.string().min(1, "Please enter your vision statement."),
  why: z.string().min(1, "Please describe your 'why'."),
});

type FormValues = z.infer<typeof formSchema>;

export function ZoneOfImpactForm() {
  const { zoneOfImpact, updateZoneOfImpact, addTask, loading: isAppContextLoading } = useAppContext();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [actionableSteps, setActionableSteps] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: zoneOfImpact,
  });

  const onSubmit = (data: FormValues) => {
    updateZoneOfImpact(data);
    toast({
      title: "Saved!",
      description: "Your Zone of Impact has been updated.",
    });
  };

  const handleGenerateSteps = async () => {
    const data = form.getValues();
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill out all fields before generating steps.",
      });
      return;
    }

    setIsGenerating(true);
    setActionableSteps([]);
    try {
      const result = await generateActionableSteps(data);
      if (result && result.actionableSteps) {
        // AI might return a single string with newlines
        const steps = result.actionableSteps.split('\n').map(s => s.replace(/^- /, '')).filter(Boolean);
        setActionableSteps(steps);
      }
    } catch (error) {
      console.error("Error generating actionable steps:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating actionable steps. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAddStepAsTask = (step: string) => {
    addTask(step, 'Weekly', 'Clarity');
    toast({
      title: "Task Added!",
      description: `"${step}" has been added to your weekly tasks.`,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="gallupStrengths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallup Strengths</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Achiever, Learner, Strategic" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your top 5 Gallup Strengths.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="why"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your "Why"</FormLabel>
                  <FormControl>
                    <Input placeholder="Your core motivation" {...field} />
                  </FormControl>
                  <FormDescription>
                    The deep-seated purpose that drives you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mission Statement</FormLabel>
              <FormControl>
                <Textarea placeholder="What you do, who you do it for, and the impact." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vision Statement</FormLabel>
              <FormControl>
                <Textarea placeholder="The future you want to create." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-4">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" onClick={handleGenerateSteps} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Actionable Next Steps
            </Button>
        </div>
      </form>
       {actionableSteps.length > 0 && (
        <Alert className="mt-8">
          <Wand2 className="h-4 w-4" />
          <AlertTitle>Suggested Next Steps</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-2">
              {actionableSteps.map((step) => (
                <li key={nanoid()} className="flex justify-between items-center">
                  <span>{step}</span>
                  <Button size="sm" variant="ghost" onClick={() => handleAddStepAsTask(step)}>Add as Task</Button>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </Form>
  );
}

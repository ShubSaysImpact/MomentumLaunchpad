// src/components/zone-of-impact/zoi-form.tsx
"use client";

import { useFormContext } from "react-hook-form";
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
import { z } from "zod";

const formSchema = z.object({
  gallupStrengths: z.string().min(1, "Please list your Gallup Strengths."),
  mission: z.string().min(1, "Please enter your mission statement."),
  vision: z.string().min(1, "Please enter your vision statement."),
  why: z.string().min(1, "Please describe your 'why'."),
});

type FormValues = z.infer<typeof formSchema>;

export function ZoneOfImpactForm() {
  const form = useFormContext<FormValues>();

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="gallupStrengths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gallup Strengths</FormLabel>
              <FormControl>
                <Textarea placeholder="Paste your top strengths from the CliftonStrengths assessment..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mission Statement</FormLabel>
              <FormControl>
                <Textarea placeholder="Articulate your purpose and the 'what' and 'for whom' of your work." {...field} />
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
                        <Textarea placeholder="Define the long-term future you are working to create." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
         <FormField
          control={form.control}
          name="why"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why Discovery Results</FormLabel>
              <FormControl>
                <Textarea placeholder="Capture your core, intrinsic motivation (e.g., from Simon Sinek's method)." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

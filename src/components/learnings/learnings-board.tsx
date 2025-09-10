"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppContext } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  content: z.string().min(1, "Learning point cannot be empty."),
});

export function LearningsBoard() {
  const { learningPoints, addLearningPoint, deleteLearningPoint, loading } = useAppContext();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const onSubmit = (data: { content: string }) => {
    addLearningPoint(data.content);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Learning</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="What did you learn today?" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
                <CardHeader>
                    <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
          ))
        ) : learningPoints.length > 0 ? (
          [...learningPoints].reverse().map((point) => (
            <Card key={point.id}>
              <CardContent className="p-4 flex flex-col h-full">
                <p className="flex-1 text-sm mb-4">{point.content}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{format(new Date(point.createdAt), "PPP")}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => deleteLearningPoint(point.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-8">
            Your learning points will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

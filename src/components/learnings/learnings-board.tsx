"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppContext } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Lightbulb, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  content: z.string().min(1, "Learning point cannot be empty."),
});

export function LearningsBoard() {
  const { learningPoints, addLearningPoint, deleteLearningPoint, loading } = useAppContext();
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const onSubmit = (data: { content: string }) => {
    addLearningPoint(data.content);
    form.reset();
    toast({
        title: "Learning Point Added!",
        description: "Your new insight has been saved."
    })
  };

  const handleDelete = (id: string) => {
    deleteLearningPoint(id);
    toast({
        title: "Learning Point Deleted.",
        variant: "destructive"
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Learning Point</CardTitle>
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
                      <Input placeholder="Add a new learning point..." {...field} />
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

        <Card>
            <CardHeader>
                <CardTitle>Your Learning Points</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96">
                    {loading ? (
                    <div className="space-y-2 pr-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                    ) : learningPoints.length > 0 ? (
                    <ul className="space-y-2 pr-4">
                        {[...learningPoints].reverse().map((point) => (
                        <li key={point.id} className="group flex items-center p-3 rounded-md border bg-card hover:bg-muted/50">
                            <Lightbulb className="h-5 w-5 mr-3 text-amber-500" />
                            <p className="flex-1 text-sm">{point.content}</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                onClick={() => handleDelete(point.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                        <p className="text-muted-foreground">No learning points yet. Add one!</p>
                    </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    </div>
  );
}

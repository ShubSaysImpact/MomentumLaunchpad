// src/components/zone-of-impact/actionable-next-steps.tsx
"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { GoalCategory, TaskCategory, Domain } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { PlusCircle } from "lucide-react";

interface ActionableNextStepsProps {
  steps: string[];
  isGenerating: boolean;
  onAddTask: (content: string, category: TaskCategory, domain: Domain | "Global") => void;
  onAddGoal: (content: string, category: GoalCategory, domain: Domain | "Global") => void;
}

export function ActionableNextSteps({ steps, isGenerating, onAddTask, onAddGoal }: ActionableNextStepsProps) {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processedSteps, setProcessedSteps] = useState<Set<string>>(new Set());

  const handleAdd = (step: string, type: "task" | "goal", category: TaskCategory | GoalCategory) => {
    if (type === "task") {
      onAddTask(step, category as TaskCategory, "Clarity");
    } else {
      onAddGoal(step, category as GoalCategory, "Clarity");
    }
    toast({
      title: "Item Added!",
      description: `"${step}" has been added as a new ${type}.`,
    });
    setProcessedSteps(prev => new Set(prev).add(step));
  };
  
  const handleOpenChange = (open: boolean) => {
    // Reset processed steps when dialog is closed
    if (!open) {
      setProcessedSteps(new Set());
    }
    setDialogOpen(open);
  }

  const renderContent = () => {
    if (isGenerating) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }

    if (steps.length === 0) {
      return (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">AI-generated steps will be displayed here</p>
        </div>
      );
    }

    return (
        <>
            <ul className="space-y-3">
            {steps.map((step) => (
                <li key={nanoid()} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <span className="text-sm">{step}</span>
                </li>
            ))}
            </ul>
             <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button className="mt-6 w-full" disabled={steps.length === 0}>Process Actionable Steps</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Process Your Actionable Steps</DialogTitle>
                    <DialogDescription>
                        Turn your AI-generated insights into a concrete action plan by adding them to your task and goal lists.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-4 max-h-[50vh] overflow-y-auto">
                    {steps.map((step) => (
                        <div key={nanoid()} className="flex justify-between items-center p-2 border rounded-md">
                        <span className="text-sm flex-1 pr-2">{step}</span>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={processedSteps.has(step)}>
                                    <PlusCircle className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleAdd(step, "task", "Daily")}>Daily Task</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAdd(step, "task", "Weekly")}>Weekly Task</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAdd(step, "goal", "Weekly")}>Weekly Goal</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAdd(step, "goal", "Monthly")}>Monthly Goal</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    ))}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => handleOpenChange(false)}>Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Your Actionable Next Steps</CardTitle>
        <CardDescription>
          {isGenerating ? "Generating tailored suggestions..." : "These are AI-generated suggestions based on your unique inputs."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}

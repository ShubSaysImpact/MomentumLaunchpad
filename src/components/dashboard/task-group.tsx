"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppContext } from "@/context/app-context"
import { Goal, Task } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TaskGroupProps {
  title: string
  description: string
  items: (Task | Goal)[]
}

export function TaskGroup({ title, description, items }: TaskGroupProps) {
  const { toggleTask, toggleGoal, loading } = useAppContext()

  const handleToggle = (id: string, type: "task" | "goal") => {
    if (type === "task") {
      toggleTask(id)
    } else {
      toggleGoal(id)
    }
  }

  const getItemType = (item: Task | Goal): "task" | "goal" => {
    // This is a simple heuristic. A better way might be a 'type' property.
    if ('category' in item && (item.category === 'Daily' || item.category === 'Weekly')) {
        // If it can be a weekly goal or a weekly task, we need more info.
        // Let's assume if it doesn't have a 'domain' it's a global task or we can add more specific properties.
        // A simple check can be based on properties that only exist on one type.
        // For now, this is a simplified logic.
        // Let's refine this: Goal has 'Monthly' or 'Weekly'. Task has 'Daily' or 'Weekly'.
        if (item.category === 'Daily' || item.category === 'Monthly') {
            return item.category === 'Daily' ? 'task' : 'goal';
        }
        // For 'Weekly', we need a more robust way. For this implementation, we will assume 'content' structure can differentiate.
        // But a 'type' field would be ideal.
        // Given the current types, let's assume `Goal` can be `Monthly` and `Task` can be `Daily`.
        return (item as Task).category === 'Daily' ? 'task' : 'goal';
    }
    return 'task';
  };
  
  const hasTitle = title && description;

  if (loading) {
     return (
        <Card>
          {hasTitle && (
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
          )}
            <CardContent className="space-y-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2 p-2 rounded-md bg-muted animate-pulse h-10" />
                ))}
            </CardContent>
        </Card>
     )
  }

  const content = (
      <>
        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center space-x-3 rounded-md border border-border p-3 transition-colors",
                  item.completed ? "bg-muted/50 text-muted-foreground" : "bg-card"
                )}
              >
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={() => handleToggle(item.id, 'domain' in item && (item.domain === 'Clarity' || item.domain === 'Traction' || item.domain === 'Monetisation' || item.domain === 'Global') && (item.category === 'Weekly' || item.category === 'Monthly') ? 'goal' : 'task')}
                />
                <label
                  htmlFor={item.id}
                  className={cn(
                    "flex-1 text-sm font-medium leading-none",
                    item.completed && "line-through"
                  )}
                >
                  {item.content}
                </label>
                <span className="text-xs font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">{'domain' in item ? item.domain : 'Global'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No items in this category.
          </p>
        )}
      </>
  );

  if (hasTitle) {
    return (
       <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    )
  }

  return <div>{content}</div>
}

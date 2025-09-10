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
    // A task can be 'Daily' or 'Weekly', while a goal can be 'Weekly' or 'Monthly'.
    // 'Monthly' is unique to Goals, 'Daily' is unique to Tasks. 'Weekly' is shared.
    // The most reliable check is for the category field.
    return (item.category === 'Daily' || item.category === 'Weekly') && 'completedAt' in item
      ? 'task'
      : 'goal';
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
                  onCheckedChange={() => handleToggle(item.id, getItemType(item))}
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

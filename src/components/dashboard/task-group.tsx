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

  const handleToggle = (id: string, isGoal: boolean) => {
    if (isGoal) {
      toggleGoal(id)
    } else {
      toggleTask(id)
    }
  }

  // A Goal has a category of 'Weekly' or 'Monthly'. A Task has 'Daily' or 'Weekly'.
  // We can differentiate them by checking for the 'Monthly' or 'Daily' category,
  // or by checking for properties unique to each if they both are 'Weekly'.
  // The type definition is the most reliable way. `item.category` is on both.
  // The most robust check without adding a `type` property is to check for a property that only exists on one type.
  // Both `Goal` and `Task` have identical properties in the type definition, except for the `category` literals.
  // A simple way to check is to see if 'Monthly' is a possible category.
  const isItemGoal = (item: Task | Goal): item is Goal => {
    return item.category === 'Monthly' || (item.category === 'Weekly' && 'domain' in item && (item.domain === 'Clarity' || item.domain === 'Traction' || item.domain === 'Monetisation' || item.domain === 'Global'));
  }

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
            {items.map((item) => {
              const itemIsGoal = item.category === 'Monthly' || (item.category === 'Weekly' && (item as Goal).domain !== undefined);
              return (
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
                  onCheckedChange={() => handleToggle(item.id, itemIsGoal)}
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
            )})}
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

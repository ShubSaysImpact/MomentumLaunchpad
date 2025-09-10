// src/components/monetisation/monetisation-goal-management.tsx
"use client";

import { useAppContext } from "@/context/app-context";
import { Goal, Task } from "@/lib/types";
import { useEffect, useState } from "react";
import { TaskGroup } from "../dashboard/task-group";
import { AddItemForm } from "../traction/add-item-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export function MonetisationGoalManagement() {
    const { goals, tasks, loading, addGoal, addTask } = useAppContext();
    const [monetisationGoals, setMonetisationGoals] = useState<Goal[]>([]);
    const [monetisationTasks, setMonetisationTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!loading) {
            setMonetisationGoals(goals.filter(g => g.domain === "Monetisation"));
            setMonetisationTasks(tasks.filter(t => t.domain === "Monetisation"));
        }
    }, [goals, tasks, loading]);
    
    const handleAddGoal = (content: string, category: "Weekly" | "Monthly") => {
        addGoal(content, category, "Monetisation");
    }

    const handleAddTask = (content: string, category: "Daily" | "Weekly") => {
        addTask(content, category, "Monetisation");
    }

    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Monetisation Goals</CardTitle>
                    <CardDescription>Monthly and weekly objectives for your revenue strategy.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddItemForm 
                        itemType="goal" 
                        onAddItem={handleAddGoal} 
                        categories={["Monthly", "Weekly"]} 
                        placeholder="e.g., Secure first 3 paying clients"
                    />
                    <TaskGroup title="" description="" items={monetisationGoals} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Monetisation Tasks</CardTitle>
                    <CardDescription>Weekly and daily action items to achieve your goals.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddItemForm 
                        itemType="task" 
                        onAddItem={handleAddTask} 
                        categories={["Weekly", "Daily"]} 
                        placeholder="e.g., Set up payment gateway"
                    />
                    <TaskGroup title="" description="" items={monetisationTasks} />
                </CardContent>
            </Card>
        </div>
    )
}

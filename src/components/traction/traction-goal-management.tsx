// src/components/traction/traction-goal-management.tsx
"use client";

import { useAppContext } from "@/context/app-context";
import { Goal, Task } from "@/lib/types";
import { useEffect, useState } from "react";
import { TaskGroup } from "../dashboard/task-group";
import { AddItemForm } from "./add-item-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export function TractionGoalManagement() {
    const { goals, tasks, loading, addGoal, addTask } = useAppContext();
    const [tractionGoals, setTractionGoals] = useState<Goal[]>([]);
    const [tractionTasks, setTractionTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!loading) {
            setTractionGoals(goals.filter(g => g.domain === "Traction"));
            setTractionTasks(tasks.filter(t => t.domain === "Traction"));
        }
    }, [goals, tasks, loading]);
    
    const handleAddGoal = (content: string, category: "Weekly" | "Monthly") => {
        addGoal(content, category, "Traction");
    }

    const handleAddTask = (content: string, category: "Daily" | "Weekly") => {
        addTask(content, category, "Traction");
    }

    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Traction Goals</CardTitle>
                    <CardDescription>Monthly and weekly objectives for building momentum.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddItemForm 
                        itemType="goal" 
                        onAddItem={handleAddGoal} 
                        categories={["Monthly", "Weekly"]} 
                        placeholder="e.g., Secure 10 discovery calls"
                    />
                    <TaskGroup title="" description="" items={tractionGoals} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Traction Tasks</CardTitle>
                    <CardDescription>Weekly and daily action items to achieve your goals.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddItemForm 
                        itemType="task" 
                        onAddItem={handleAddTask} 
                        categories={["Weekly", "Daily"]} 
                        placeholder="e.g., Post on LinkedIn 3 times"
                    />
                    <TaskGroup title="" description="" items={tractionTasks} />
                </CardContent>
            </Card>
        </div>
    )
}

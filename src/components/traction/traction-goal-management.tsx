// src/components/traction/traction-goal-management.tsx
"use client";

import { useAppContext } from "@/context/app-context";
import { Goal, Task } from "@/lib/types";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskGroup } from "../dashboard/task-group";


export function TractionGoalManagement() {
    const { goals, tasks, loading } = useAppContext();
    const [tractionGoals, setTractionGoals] = useState<Goal[]>([]);
    const [tractionTasks, setTractionTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!loading) {
            setTractionGoals(goals.filter(g => g.domain === "Traction"));
            setTractionTasks(tasks.filter(t => t.domain === "Traction"));
        }
    }, [goals, tasks, loading]);


    return (
        <div className="space-y-6">
            <TaskGroup title="Traction Goals" description="Monthly and weekly objectives for building momentum." items={tractionGoals} />
            <TaskGroup title="Traction Tasks" description="Weekly and daily action items to achieve your goals." items={tractionTasks} />
        </div>
    )
}
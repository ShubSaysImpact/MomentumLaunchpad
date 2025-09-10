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
        <Card>
            <CardHeader>
                <CardTitle>Traction Goals & Tasks</CardTitle>
                <CardDescription>Set and track your objectives for building momentum.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="goals">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="goals">Goals</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="goals" className="pt-4">
                        <TaskGroup title="Traction Goals" description="Monthly and weekly objectives." items={tractionGoals} />
                    </TabsContent>
                    <TabsContent value="tasks" className="pt-4">
                        <TaskGroup title="Traction Tasks" description="Weekly and daily action items." items={tractionTasks} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

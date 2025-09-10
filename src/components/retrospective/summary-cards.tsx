"use client";

import { useAppContext } from "@/context/app-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isThisWeek, isThisMonth, parseISO } from 'date-fns';
import { useEffect, useState } from "react";
import { Goal, Task } from "@/lib/types";

export function SummaryCards() {
    const { goals, tasks, loading } = useAppContext();
    const [weeklyCompletions, setWeeklyCompletions] = useState(0);
    const [monthlyCompletions, setMonthlyCompletions] = useState(0);
    
    useEffect(() => {
        if (!loading) {
            const allItems: (Task | Goal)[] = [...tasks, ...goals];
            const completedItems = allItems.filter(item => item.completed && item.completedAt);
            
            const weekly = completedItems.filter(item => isThisWeek(parseISO(item.completedAt!), { weekStartsOn: 1 })).length;
            const monthly = completedItems.filter(item => isThisMonth(parseISO(item.completedAt!))).length;
            
            setWeeklyCompletions(weekly);
            setMonthlyCompletions(monthly);
        }
    }, [goals, tasks, loading]);


    if(loading) {
        return (
             <div className="grid gap-6 md:grid-cols-2">
                <Card className="animate-pulse"><CardHeader><div className="h-6 w-3/4 bg-muted rounded"></div></CardHeader><CardContent><div className="h-10 w-1/4 bg-muted rounded"></div></CardContent></Card>
                <Card className="animate-pulse"><CardHeader><div className="h-6 w-3/4 bg-muted rounded"></div></CardHeader><CardContent><div className="h-10 w-1/4 bg-muted rounded"></div></CardContent></Card>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Completed This Week</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{weeklyCompletions}</p>
                    <p className="text-sm text-muted-foreground">goals and tasks</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Completed This Month</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{monthlyCompletions}</p>
                    <p className="text-sm text-muted-foreground">goals and tasks</p>
                </CardContent>
            </Card>
        </div>
    );
}

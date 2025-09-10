"use client";

import { useAppContext } from "@/context/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { isThisWeek, isThisMonth, parseISO } from 'date-fns';
import { useEffect, useState } from "react";
import { Goal, Task } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { CheckCircle2 } from "lucide-react";

const CompletedItemsList = ({ items }: { items: (Goal | Task)[] }) => {
    if (items.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">No items completed yet.</p>
    }

    return (
        <ScrollArea className="h-48">
             <ul className="space-y-2 pr-4">
                {[...items].reverse().map(item => (
                    <li key={item.id} className="text-sm flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <span>{item.content}</span>
                    </li>
                ))}
            </ul>
        </ScrollArea>
    )
}

export function SummaryCards() {
    const { goals, tasks, loading } = useAppContext();
    const [weeklyItems, setWeeklyItems] = useState<(Goal | Task)[]>([]);
    const [monthlyItems, setMonthlyItems] = useState<(Goal | Task)[]>([]);
    
    useEffect(() => {
        if (!loading) {
            const allItems: (Task | Goal)[] = [...tasks, ...goals];
            const completedItems = allItems.filter(item => item.completed && item.completedAt);
            
            const weekly = completedItems.filter(item => isThisWeek(parseISO(item.completedAt!), { weekStartsOn: 1 }));
            const monthly = completedItems.filter(item => isThisMonth(parseISO(item.completedAt!)));
            
            setWeeklyItems(weekly);
            setMonthlyItems(monthly);
        }
    }, [goals, tasks, loading]);


    if(loading) {
        return (
             <>
                <Card className="animate-pulse">
                    <CardHeader><div className="h-6 w-3/4 bg-muted rounded"></div></CardHeader>
                    <CardContent className="space-y-2">
                         <div className="h-4 w-1/4 bg-muted rounded mb-4"></div>
                         <div className="h-6 w-full bg-muted rounded"></div>
                         <div className="h-6 w-full bg-muted rounded"></div>
                         <div className="h-6 w-2/3 bg-muted rounded"></div>
                    </CardContent>
                </Card>
                 <Card className="animate-pulse">
                    <CardHeader><div className="h-6 w-3/4 bg-muted rounded"></div></CardHeader>
                    <CardContent className="space-y-2">
                         <div className="h-4 w-1/4 bg-muted rounded mb-4"></div>
                         <div className="h-6 w-full bg-muted rounded"></div>
                         <div className="h-6 w-full bg-muted rounded"></div>
                         <div className="h-6 w-2/3 bg-muted rounded"></div>
                    </CardContent>
                </Card>
            </>
        )
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>This Week's Completed Items ({weeklyItems.length})</CardTitle>
                    <CardDescription>A summary of your accomplishments this week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CompletedItemsList items={weeklyItems} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>This Month's Completed Items ({monthlyItems.length})</CardTitle>
                     <CardDescription>A summary of your accomplishments this month.</CardDescription>
                </CardHeader>
                <CardContent>
                     <CompletedItemsList items={monthlyItems} />
                </CardContent>
            </Card>
        </>
    );
}

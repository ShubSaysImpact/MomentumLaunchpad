"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { TaskGroup } from "@/components/dashboard/task-group";
import { useAppContext } from "@/context/app-context";
import { useEffect, useState } from "react";
import { Goal, Task } from "@/lib/types";

export default function DashboardPage() {
  const { goals, tasks, loading } = useAppContext();
  const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>([]);
  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([]);
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    if (!loading) {
      setWeeklyGoals(goals.filter(g => g.category === 'Weekly' && !g.completed));
      setWeeklyTasks(tasks.filter(t => t.category === 'Weekly' && !t.completed));
      setDailyTasks(tasks.filter(t => t.category === 'Daily' && !t.completed));
    }
  }, [goals, tasks, loading]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your progress."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProgressChart />
        </div>
        <div className="grid gap-6 lg:col-span-2">
            <TaskGroup title="Weekly Goals" description="Your main objectives for this week." items={weeklyGoals} />
        </div>
        <div className="lg:col-span-3 grid gap-6 md:grid-cols-2">
            <TaskGroup title="Weekly Tasks" description="Tasks to complete this week." items={weeklyTasks} />
            <TaskGroup title="Daily Tasks" description="Your priorities for today." items={dailyTasks} />
        </div>
      </div>
    </>
  );
}

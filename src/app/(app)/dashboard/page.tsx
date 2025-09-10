"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { TaskGroup } from "@/components/dashboard/task-group";
import { useAppContext } from "@/context/app-context";
import { useEffect, useState } from "react";
import { Goal, Task } from "@/lib/types";
import { DomainProgressCard } from "@/components/dashboard/domain-progress-card";
import { ExternalToolsCard } from "@/components/dashboard/external-tools-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";


export default function DashboardPage() {
  const { goals, tasks, loading } = useAppContext();
  const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>([]);
  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([]);
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!loading) {
      const now = new Date();
      setWeeklyGoals(goals.filter(g => g.category === 'Weekly' && !g.completed));
      setWeeklyTasks(tasks.filter(t => t.category === 'Weekly' && !t.completed));
      setDailyTasks(tasks.filter(t => t.category === 'Daily' && !t.completed));
    }
  }, [goals, tasks, loading]);
  
  const domainCards = [
    { domain: "Clarity", title: "Clarity", description: "Define your unique value.", href: "/zone-of-impact", imageId: "clarity-card" },
    { domain: "Traction", title: "Traction & Buy-in", description: "Build momentum and engagement.", href: "/traction-buy-in", imageId: "traction-card" },
    { domain: "Monetisation", title: "Monetisation", description: "Develop your revenue streams.", href: "/monetisation", imageId: "monetisation-card" }
  ];


  return (
    <>
      <PageHeader
        title="Welcome back, Clinician Founder"
        description="Here's an at-a-glance overview of your venture's progress."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {domainCards.map(card => {
                const image = PlaceHolderImages.find(img => img.id === card.imageId);
                if (!image) return null;
                return (
                    <DomainProgressCard 
                        key={card.domain}
                        domain={card.domain as any}
                        title={card.title}
                        description={card.description}
                        href={card.href}
                        image={image}
                    />
                )
            })}
          </div>
          <TaskGroup title="This Week's Goals" description="Your primary objectives." items={weeklyGoals} />
          <div className="grid md:grid-cols-2 gap-6">
            <TaskGroup title="This Week's Tasks" description="All tasks for the current week." items={weeklyTasks} />
            <TaskGroup title="Today's Tasks" description="Your immediate priorities." items={dailyTasks} />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <ProgressChart />
          <ExternalToolsCard 
            tools={[
              {
                name: "Voice of Impact GPT",
                description: "AI coach for content generation and messaging.",
                href: "https://chatgpt.com/g/g-68389b2e3e608191bd6912c2d1bb5038-voice-of-impact"
              }
            ]}
          />
        </div>

      </div>
    </>
  );
}

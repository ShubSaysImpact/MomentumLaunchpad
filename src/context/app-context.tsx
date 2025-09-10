"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { AppData, Task, Goal, LearningPoint, PinnedIdea, ZoneOfImpactData, ResonanceTest, ResonanceTestData, Domain, GoalCategory, TaskCategory } from "@/lib/types";
import {nanoid} from 'nanoid';

const defaultAppData: AppData = {
  goals: [],
  tasks: [],
  learningPoints: [],
  pinnedIdeas: [],
  zoneOfImpact: {
    gallupStrengths: "",
    mission: "",
    vision: "",
    why: "",
  },
  resonanceTests: {
    founderStory: [],
    ideaPitch: [],
    offer: [],
  }
};

interface AppContextType extends AppData {
  loading: boolean;
  addTask: (content: string, category: TaskCategory, domain: Domain | "Global") => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addGoal: (content: string, category: GoalCategory, domain: Domain | "Global") => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  toggleGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  addLearningPoint: (content: string) => void;
  deleteLearningPoint: (id: string) => void;
  addPinnedIdea: (content: string) => void;
  deletePinnedIdea: (id: string) => void;
  updateZoneOfImpact: (data: Partial<ZoneOfImpactData>) => void;
  addResonanceTest: (category: keyof ResonanceTestData, test: Omit<ResonanceTest, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData, loading] = useLocalStorage<AppData>(
    "momentum-launchpad-data",
    defaultAppData
  );

  const addTask = (content: string, category: TaskCategory, domain: Domain | "Global") => {
    const newTask: Task = { id: nanoid(), content, category, domain, completed: false, createdAt: new Date().toISOString() };
    setData(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updates } : t) }));
  };

  const toggleTask = (id: string) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined } : t) }));
  };

  const deleteTask = (id: string) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  const addGoal = (content: string, category: GoalCategory, domain: Domain | "Global") => {
    const newGoal: Goal = { id: nanoid(), content, category, domain, completed: false, createdAt: new Date().toISOString() };
    setData(prev => ({ ...prev, goals: [...prev.goals, newGoal] }));
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setData(prev => ({ ...prev, goals: prev.goals.map(g => g.id === id ? { ...g, ...updates } : g) }));
  };
  
  const toggleGoal = (id: string) => {
    setData(prev => ({ ...prev, goals: prev.goals.map(g => g.id === id ? { ...g, completed: !g.completed, completedAt: !g.completed ? new Date().toISOString() : undefined } : g) }));
  };
  
  const deleteGoal = (id: string) => {
    setData(prev => ({ ...prev, goals: prev.goals.filter(g => g.id !== id) }));
  };

  const addLearningPoint = (content: string) => {
    const newLearningPoint: LearningPoint = { id: nanoid(), content, createdAt: new Date().toISOString() };
    setData(prev => ({ ...prev, learningPoints: [...prev.learningPoints, newLearningPoint] }));
  };

  const deleteLearningPoint = (id: string) => {
    setData(prev => ({...prev, learningPoints: prev.learningPoints.filter(lp => lp.id !== id)}));
  };

  const addPinnedIdea = (content: string) => {
    const newPinnedIdea: PinnedIdea = { id: nanoid(), content, createdAt: new Date().toISOString() };
    setData(prev => ({ ...prev, pinnedIdeas: [...prev.pinnedIdeas, newPinnedIdea] }));
  };

  const deletePinnedIdea = (id: string) => {
     setData(prev => ({...prev, pinnedIdeas: prev.pinnedIdeas.filter(pi => pi.id !== id)}));
  };

  const updateZoneOfImpact = (zoiData: Partial<ZoneOfImpactData>) => {
    setData(prev => ({ ...prev, zoneOfImpact: { ...prev.zoneOfImpact, ...zoiData } }));
  };

  const addResonanceTest = (category: keyof ResonanceTestData, test: Omit<ResonanceTest, 'id' | 'createdAt'>) => {
    const newTest: ResonanceTest = { ...test, id: nanoid(), createdAt: new Date().toISOString() };
    setData(prev => ({
        ...prev,
        resonanceTests: {
            ...prev.resonanceTests,
            [category]: [...prev.resonanceTests[category], newTest]
        }
    }));
  };

  const value = {
    ...data,
    loading,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    addGoal,
    updateGoal,
    toggleGoal,
    deleteGoal,
    addLearningPoint,
    deleteLearningPoint,
    addPinnedIdea,
    deletePinnedIdea,
    updateZoneOfImpact,
    addResonanceTest,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

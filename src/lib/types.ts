export type Domain = "Clarity" | "Traction" | "Monetisation";
export type GoalCategory = "Weekly" | "Monthly";
export type TaskCategory = "Daily" | "Weekly";

export interface Item {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string; // ISO string
  completedAt?: string; // ISO string
}

export interface Goal extends Item {
  category: GoalCategory;
  domain: Domain | "Global";
}

export interface Task extends Item {
  category: TaskCategory;
  domain: Domain | "Global";
}

export interface LearningPoint {
  id: string;
  content: string;
  createdAt: string; // ISO string
}

export interface PinnedIdea {
  id: string;
  content: string;
  createdAt: string; // ISO string
}

export type ZoneOfImpactData = {
  gallupStrengths: string;
  mission: string;
  vision: string;
  why: string;
};

export type AppData = {
  goals: Goal[];
  tasks: Task[];
  learningPoints: LearningPoint[];
  pinnedIdeas: PinnedIdea[];
  zoneOfImpact: ZoneOfImpactData;
};

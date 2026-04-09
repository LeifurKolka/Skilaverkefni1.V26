export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: string;
}
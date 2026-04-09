import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  createdAt: z.string(),
});

export const taskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string().min(1, "Task title is required"),
  description: z.string().min(1, "Task description is required"),
  completed: z.boolean(),
  priority: z.enum(["low", "medium", "high"]),
  createdAt: z.string(),
});

export const projectsSchema = z.array(projectSchema);
export const tasksSchema = z.array(taskSchema);
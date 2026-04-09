import { create } from "zustand";
import type { Project } from "../types/project";
import type { Task } from "../types/task";
import { projectsSchema, tasksSchema } from "../utils/schemas";
import { loadFromStorage, saveToStorage } from "../utils/storage";

interface TaskHubState {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | null;

  setSelectedProject: (projectId: string | null) => void;

  addProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;

  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
}

const initialProjects = loadFromStorage("projects", projectsSchema, []);
const initialTasks = loadFromStorage("tasks", tasksSchema, []);

export const useTaskHubStore = create<TaskHubState>((set) => ({
  projects: initialProjects,
  tasks: initialTasks,
  selectedProjectId: initialProjects.length > 0 ? initialProjects[0].id : null,

  setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),

  addProject: (project) =>
  set((state) => {
    const updatedProjects = [...state.projects, project];
    saveToStorage("projects", updatedProjects);

    return {
      projects: updatedProjects,
      selectedProjectId: project.id,
    };
  }),

  deleteProject: (projectId) =>
    set((state) => {
      const updatedProjects = state.projects.filter(
        (project) => project.id !== projectId
      );

      const updatedTasks = state.tasks.filter(
        (task) => task.projectId !== projectId
      );

      saveToStorage("projects", updatedProjects);
      saveToStorage("tasks", updatedTasks);

      return {
        projects: updatedProjects,
        tasks: updatedTasks,
        selectedProjectId:
          state.selectedProjectId === projectId ? null : state.selectedProjectId,
      };
    }),

  addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      saveToStorage("tasks", updatedTasks);

      return {
        tasks: updatedTasks,
      };
    }),

  updateTask: (taskId, updates) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      );

      saveToStorage("tasks", updatedTasks);

      return {
        tasks: updatedTasks,
      };
    }),

  deleteTask: (taskId) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
      saveToStorage("tasks", updatedTasks);

      return {
        tasks: updatedTasks,
      };
    }),

  toggleTaskCompletion: (taskId) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      saveToStorage("tasks", updatedTasks);

      return {
        tasks: updatedTasks,
      };
    }),
}));
import { useMemo } from "react";
import type { Project } from "../types/project";
import type { Task } from "../types/task";

interface UseSelectedProjectProps {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | null;
}

export function useSelectedProject({
  projects,
  tasks,
  selectedProjectId,
}: UseSelectedProjectProps) {
  const selectedProject = useMemo(() => {
    return projects.find((project) => project.id === selectedProjectId) ?? null;
  }, [projects, selectedProjectId]);

  const selectedProjectTasks = useMemo(() => {
    return tasks.filter((task) => task.projectId === selectedProjectId);
  }, [tasks, selectedProjectId]);

  return {
    selectedProject,
    selectedProjectTasks,
  };
}
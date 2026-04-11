import { useMemo } from "react";
import type { Task } from "../types/task";

interface UseTaskFiltersProps {
  tasks: Task[];
  searchTerm: string;
  statusFilter: "all" | "completed" | "incomplete";
  priorityFilter: "all" | "low" | "medium" | "high";
}

export function useTaskFilters({
  tasks,
  searchTerm,
  statusFilter,
  priorityFilter,
}: UseTaskFiltersProps) {
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "incomplete" && !task.completed);

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  return filteredTasks;
}
import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTaskFilters } from "./useTaskFilters";
import type { Task } from "../types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    projectId: "project-1",
    title: "Write report",
    description: "Finish the weekly report",
    completed: false,
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    projectId: "project-1",
    title: "Fix bug",
    description: "Resolve login issue",
    completed: true,
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    projectId: "project-1",
    title: "Team meeting",
    description: "Discuss sprint tasks",
    completed: false,
    priority: "low",
    createdAt: new Date().toISOString(),
  },
];

describe("useTaskFilters", () => {
  it("returns all tasks when no filters are applied", () => {
    const { result } = renderHook(() =>
      useTaskFilters({
        tasks: mockTasks,
        searchTerm: "",
        statusFilter: "all",
        priorityFilter: "all",
      })
    );

    expect(result.current).toHaveLength(3);
  });

  it("filters tasks by search term", () => {
    const { result } = renderHook(() =>
      useTaskFilters({
        tasks: mockTasks,
        searchTerm: "bug",
        statusFilter: "all",
        priorityFilter: "all",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe("Fix bug");
  });

  it("filters tasks by completed status", () => {
    const { result } = renderHook(() =>
      useTaskFilters({
        tasks: mockTasks,
        searchTerm: "",
        statusFilter: "completed",
        priorityFilter: "all",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].completed).toBe(true);
  });

  it("filters tasks by priority", () => {
    const { result } = renderHook(() =>
      useTaskFilters({
        tasks: mockTasks,
        searchTerm: "",
        statusFilter: "all",
        priorityFilter: "high",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].priority).toBe("high");
  });

  it("combines search, status, and priority filters correctly", () => {
    const { result } = renderHook(() =>
      useTaskFilters({
        tasks: mockTasks,
        searchTerm: "report",
        statusFilter: "incomplete",
        priorityFilter: "high",
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe("Write report");
  });
});
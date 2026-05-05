import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TaskList } from "./TaskList";
import type { Task } from "../../types/task";

const mockTasks: Task[] = [
  {
    id: "task-1",
    projectId: "project-1",
    title: "Write tests",
    description: "Add Vitest coverage",
    completed: false,
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
];

describe("TaskList", () => {
  it("renders a task and its actions", () => {
    render(
      <TaskList
        tasks={mockTasks}
        editingTaskId={null}
        editTitle=""
        editDescription=""
        editPriority="medium"
        onEditTitleChange={vi.fn()}
        onEditDescriptionChange={vi.fn()}
        onEditPriorityChange={vi.fn()}
        onStartEdit={vi.fn()}
        onSaveEdit={vi.fn()}
        onCancelEdit={vi.fn()}
        onToggleTask={vi.fn()}
        onDeleteTask={vi.fn()}
      />
    );

    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Add Vitest coverage")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mark complete/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit task/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete task/i })).toBeInTheDocument();
  });

  it("shows edit fields when a task is in editing mode", () => {
    render(
      <TaskList
        tasks={mockTasks}
        editingTaskId="task-1"
        editTitle="Write tests"
        editDescription="Add Vitest coverage"
        editPriority="medium"
        onEditTitleChange={vi.fn()}
        onEditDescriptionChange={vi.fn()}
        onEditPriorityChange={vi.fn()}
        onStartEdit={vi.fn()}
        onSaveEdit={vi.fn()}
        onCancelEdit={vi.fn()}
        onToggleTask={vi.fn()}
        onDeleteTask={vi.fn()}
      />
    );

    expect(screen.getByDisplayValue("Write tests")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Add Vitest coverage")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  
});
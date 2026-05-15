import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "./TaskList";
import type { Task } from "../../types/task";

const sampleTasks: Task[] = [
  {
    id: "task-1",
    projectId: "project-1",
    title: "Write documentation",
    description: "Prepare README and usage notes",
    completed: false,
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    projectId: "project-1",
    title: "Fix validation bug",
    description: "Prevent empty task titles from saving",
    completed: true,
    priority: "high",
    createdAt: new Date().toISOString(),
  },
];

const meta: Meta<typeof TaskList> = {
  title: "Tasks/TaskList",
  component: TaskList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TaskList>;

export const Default: Story = {
  args: {
    tasks: sampleTasks,
    editingTaskId: null,
    editTitle: "",
    editDescription: "",
    editPriority: "medium",
    onEditTitleChange: () => {},
    onEditDescriptionChange: () => {},
    onEditPriorityChange: () => {},
    onStartEdit: () => {},
    onSaveEdit: () => {},
    onCancelEdit: () => {},
    onToggleTask: () => {},
    onDeleteTask: () => {},
  },
};

export const EmptyState: Story = {
  args: {
    tasks: [],
    editingTaskId: null,
    editTitle: "",
    editDescription: "",
    editPriority: "medium",
    onEditTitleChange: () => {},
    onEditDescriptionChange: () => {},
    onEditPriorityChange: () => {},
    onStartEdit: () => {},
    onSaveEdit: () => {},
    onCancelEdit: () => {},
    onToggleTask: () => {},
    onDeleteTask: () => {},
  },
};

export const EditingTask: Story = {
  args: {
    tasks: [sampleTasks[0]],
    editingTaskId: "task-1",
    editTitle: "Write documentation",
    editDescription: "Prepare README and usage notes",
    editPriority: "medium",
    onEditTitleChange: () => {},
    onEditDescriptionChange: () => {},
    onEditPriorityChange: () => {},
    onStartEdit: () => {},
    onSaveEdit: () => {},
    onCancelEdit: () => {},
    onToggleTask: () => {},
    onDeleteTask: () => {},
  },
};
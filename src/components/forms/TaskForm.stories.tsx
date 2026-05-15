import type { Meta, StoryObj } from "@storybook/react";
import { TaskForm } from "./TaskForm";

const meta: Meta<typeof TaskForm> = {
  title: "Forms/TaskForm",
  component: TaskForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TaskForm>;

export const Default: Story = {
  args: {
    taskTitle: "",
    taskDescription: "",
    taskPriority: "medium",
    taskError: "",
    selectedProjectId: "project-1",
    onTaskTitleChange: () => {},
    onTaskDescriptionChange: () => {},
    onTaskPriorityChange: () => {},
    onSubmit: () => {},
  },
};

export const DisabledWithoutProject: Story = {
  args: {
    taskTitle: "",
    taskDescription: "",
    taskPriority: "medium",
    taskError: "",
    selectedProjectId: null,
    onTaskTitleChange: () => {},
    onTaskDescriptionChange: () => {},
    onTaskPriorityChange: () => {},
    onSubmit: () => {},
  },
};

export const WithValidationError: Story = {
  args: {
    taskTitle: "",
    taskDescription: "",
    taskPriority: "medium",
    taskError: "Task title is required",
    selectedProjectId: "project-1",
    onTaskTitleChange: () => {},
    onTaskDescriptionChange: () => {},
    onTaskPriorityChange: () => {},
    onSubmit: () => {},
  },
};

export const FilledOut: Story = {
  args: {
    taskTitle: "Write tests",
    taskDescription: "Add more Vitest coverage for the app",
    taskPriority: "high",
    taskError: "",
    selectedProjectId: "project-1",
    onTaskTitleChange: () => {},
    onTaskDescriptionChange: () => {},
    onTaskPriorityChange: () => {},
    onSubmit: () => {},
  },
};
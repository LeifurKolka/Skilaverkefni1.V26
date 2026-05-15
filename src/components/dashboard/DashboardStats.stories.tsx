import type { Meta, StoryObj } from "@storybook/react";
import { DashboardStats } from "./DashboardStats";

const meta: Meta<typeof DashboardStats> = {
  title: "Dashboard/DashboardStats",
  component: DashboardStats,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DashboardStats>;

export const Default: Story = {
  args: {
    totalProjects: 3,
    totalTasks: 12,
    completedTasks: 7,
    incompleteTasks: 5,
    highPriorityTasks: 4,
  },
};

export const EmptyState: Story = {
  args: {
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    incompleteTasks: 0,
    highPriorityTasks: 0,
  },
};

export const BusyWorkspace: Story = {
  args: {
    totalProjects: 8,
    totalTasks: 42,
    completedTasks: 30,
    incompleteTasks: 12,
    highPriorityTasks: 6,
  },
};
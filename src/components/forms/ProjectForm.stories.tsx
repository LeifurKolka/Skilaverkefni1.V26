import type { Meta, StoryObj } from "@storybook/react";
import { ProjectForm } from "./ProjectForm";

const meta: Meta<typeof ProjectForm> = {
  title: "Forms/ProjectForm",
  component: ProjectForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProjectForm>;

export const Default: Story = {
  args: {
    projectName: "",
    projectDescription: "",
    projectError: "",
    onProjectNameChange: () => {},
    onProjectDescriptionChange: () => {},
    onSubmit: () => {},
  },
};

export const WithValidationError: Story = {
  args: {
    projectName: "",
    projectDescription: "",
    projectError: "Project name is required",
    onProjectNameChange: () => {},
    onProjectDescriptionChange: () => {},
    onSubmit: () => {},
  },
};

export const FilledOut: Story = {
  args: {
    projectName: "Team Task Hub",
    projectDescription: "Project for tracking tasks and progress",
    projectError: "",
    onProjectNameChange: () => {},
    onProjectDescriptionChange: () => {},
    onSubmit: () => {},
  },
};
import { beforeEach, describe, expect, it } from "vitest";
import { useTaskHubStore } from "./useTaskHubStore";
import type { Project } from "../types/project";
import type { Task } from "../types/task";

describe("useTaskHubStore", () => {
  beforeEach(() => {
    localStorage.clear();

    useTaskHubStore.setState({
      projects: [],
      tasks: [],
      selectedProjectId: null,
    });
  });

  it("selects a newly added project automatically", () => {
    const firstProject: Project = {
      id: "project-1",
      name: "Project One",
      description: "First project",
      createdAt: new Date().toISOString(),
    };

    useTaskHubStore.getState().addProject(firstProject);

    const state = useTaskHubStore.getState();

    expect(state.projects).toHaveLength(1);
    expect(state.selectedProjectId).toBe("project-1");
  });

  it("deletes tasks when their project is deleted", () => {
    const project: Project = {
      id: "project-1",
      name: "Project One",
      description: "First project",
      createdAt: new Date().toISOString(),
    };

    const task: Task = {
      id: "task-1",
      projectId: "project-1",
      title: "Task One",
      description: "Task for project one",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    };

    useTaskHubStore.getState().addProject(project);
    useTaskHubStore.getState().addTask(task);
    useTaskHubStore.getState().deleteProject("project-1");

    const state = useTaskHubStore.getState();

    expect(state.projects).toHaveLength(0);
    expect(state.tasks).toHaveLength(0);
  });

  it("should select another remaining project when the selected project is deleted", () => {
    const projectOne: Project = {
      id: "project-1",
      name: "Project One",
      description: "First project",
      createdAt: new Date().toISOString(),
    };

    const projectTwo: Project = {
      id: "project-2",
      name: "Project Two",
      description: "Second project",
      createdAt: new Date().toISOString(),
    };

    useTaskHubStore.getState().addProject(projectOne);
    useTaskHubStore.getState().addProject(projectTwo);

    useTaskHubStore.getState().setSelectedProject("project-1");
    useTaskHubStore.getState().deleteProject("project-1");

    const state = useTaskHubStore.getState();

    expect(state.projects).toHaveLength(1);
    expect(state.projects[0].id).toBe("project-2");
    expect(state.selectedProjectId).toBe("project-2");
  });
});
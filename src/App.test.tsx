import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import { useTaskHubStore } from "./store/useTaskHubStore";

describe("App task editing", () => {
  beforeEach(() => {
    localStorage.clear();

    useTaskHubStore.setState({
      projects: [
        {
          id: "project-1",
          name: "Project One",
          description: "First project",
          createdAt: new Date().toISOString(),
        },
      ],
      tasks: [
        {
          id: "task-1",
          projectId: "project-1",
          title: "Write tests",
          description: "Add Vitest coverage",
          completed: false,
          priority: "medium",
          createdAt: new Date().toISOString(),
        },
      ],
      selectedProjectId: "project-1",
    });
  });

  it("does not save an edited task when the title is empty", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /edit task/i }));

    const saveButton = screen.getByRole("button", { name: /^save$/i });
    const editCard = saveButton.closest(".MuiCard-root");

    expect(editCard).not.toBeNull();

    const titleInput = within(editCard as HTMLElement).getByLabelText(/task title/i);

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.click(saveButton);

    expect(screen.getByRole("button", { name: /^save$/i })).toBeInTheDocument();

    const state = useTaskHubStore.getState();
    expect(state.tasks[0].title).toBe("Write tests");
  });
});
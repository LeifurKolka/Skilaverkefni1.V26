import "./index.css";
import { useTaskHubStore } from "./store/useTaskHubStore";

function App() {
  const {
    projects,
    tasks,
    selectedProjectId,
    addProject,
    addTask,
    setSelectedProject,
    toggleTaskCompletion,
    deleteTask,
  } = useTaskHubStore();

  const handleAddSampleProject = () => {
    addProject({
      id: crypto.randomUUID(),
      name: `Sample Project ${projects.length + 1}`,
      description: "This is a temporary test project.",
      createdAt: new Date().toISOString(),
    });
  };

  const handleAddSampleTask = () => {
    if (!selectedProjectId) return;

    addTask({
      id: crypto.randomUUID(),
      projectId: selectedProjectId,
      title: `Sample Task ${tasks.length + 1}`,
      description: "This is a temporary test task.",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    });
  };

  const selectedProjectTasks = tasks.filter(
    (task) => task.projectId === selectedProjectId
  );

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Team Task Hub</h1>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={handleAddSampleProject}
          style={{
            padding: "0.75rem 1rem",
            cursor: "pointer",
          }}
        >
          Add Sample Project
        </button>

        <button
          onClick={handleAddSampleTask}
          disabled={!selectedProjectId}
          style={{
            padding: "0.75rem 1rem",
            cursor: selectedProjectId ? "pointer" : "not-allowed",
          }}
        >
          Add Sample Task
        </button>
      </div>

      <section style={{ marginTop: "2rem" }}>
        <h2>Selected Project ID</h2>
        <p>{selectedProjectId ?? "No project selected"}</p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Projects</h2>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {projects.map((project) => {
              const isSelected = project.id === selectedProjectId;

              return (
                <li key={project.id} style={{ marginBottom: "0.75rem" }}>
                  <button
                    onClick={() => setSelectedProject(project.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "1rem",
                      border: isSelected ? "2px solid purple" : "1px solid #ccc",
                      backgroundColor: isSelected ? "#f3e8ff" : "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <strong>{project.name}</strong>
                    <div>{project.description}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Tasks for Selected Project</h2>
        {selectedProjectTasks.length === 0 ? (
          <p>No tasks for this project yet.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {selectedProjectTasks.map((task) => (
              <li
                key={task.id}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </h3>

                <p style={{ margin: "0.5rem 0" }}>{task.description}</p>

                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Priority:</strong> {task.priority}
                </p>

                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Status:</strong>{" "}
                  {task.completed ? "Completed" : "Incomplete"}
                </p>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    style={{
                      padding: "0.5rem 0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      padding: "0.5rem 0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    Delete Task
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
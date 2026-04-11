import { useMemo, useState } from "react";
import "./index.css";
import { useTaskHubStore } from "./store/useTaskHubStore";
import { useTaskFilters } from "./hooks/useTaskFilters";
import { useSelectedProject } from "./hooks/useSelectedProject";

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
    updateTask,
  } = useTaskHubStore();

  const [projectName, setProjectName] = useState("");
const [projectDescription, setProjectDescription] = useState("");

const [taskTitle, setTaskTitle] = useState("");
const [taskDescription, setTaskDescription] = useState("");
const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">(
  "medium"
);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState<"low" | "medium" | "high">(
    "medium"
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "incomplete"
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "low" | "medium" | "high"
  >("all");

 const handleAddProject = () => {
  if (!projectName.trim() || !projectDescription.trim()) return;

  addProject({
    id: crypto.randomUUID(),
    name: projectName,
    description: projectDescription,
    createdAt: new Date().toISOString(),
  });

  setProjectName("");
  setProjectDescription("");
};

  const handleAddTask = () => {
  if (!selectedProjectId) return;
  if (!taskTitle.trim() || !taskDescription.trim()) return;

  addTask({
    id: crypto.randomUUID(),
    projectId: selectedProjectId,
    title: taskTitle,
    description: taskDescription,
    completed: false,
    priority: taskPriority,
    createdAt: new Date().toISOString(),
  });

  setTaskTitle("");
  setTaskDescription("");
  setTaskPriority("medium");
};

  const handleStartEdit = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (!taskToEdit) return;

    setEditingTaskId(taskToEdit.id);
    setEditTitle(taskToEdit.title);
    setEditDescription(taskToEdit.description);
    setEditPriority(taskToEdit.priority);
  };

  const handleSaveEdit = () => {
    if (!editingTaskId) return;

    updateTask(editingTaskId, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });

    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
  };

 const { selectedProject, selectedProjectTasks } = useSelectedProject({
  projects,
  tasks,
  selectedProjectId,
});

const filteredTasks = useTaskFilters({
  tasks: selectedProjectTasks,
  searchTerm,
  statusFilter,
  priorityFilter,
});

const dashboardStats = useMemo(() => {
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length;

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    incompleteTasks,
    highPriorityTasks,
  };
}, [projects, tasks]);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Team Task Hub</h1>

      <section style={{ marginTop: "2rem" }}>
  <h2>Dashboard</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "1rem",
      marginTop: "1rem",
    }}
  >
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Projects</h3>
      <p>{dashboardStats.totalProjects}</p>
    </div>

    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Tasks</h3>
      <p>{dashboardStats.totalTasks}</p>
    </div>

    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Completed</h3>
      <p>{dashboardStats.completedTasks}</p>
    </div>

    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Incomplete</h3>
      <p>{dashboardStats.incompleteTasks}</p>
    </div>

    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <h3 style={{ marginTop: 0 }}>High Priority</h3>
      <p>{dashboardStats.highPriorityTasks}</p>
    </div>
  </div>
</section>


        <section style={{ marginTop: "2rem" }}>
  <h2>Create Project</h2>

  <div
    style={{
      display: "grid",
      gap: "0.75rem",
      maxWidth: "500px",
      marginTop: "1rem",
    }}
  >
    <input
      type="text"
      placeholder="Project name"
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      style={{ padding: "0.75rem" }}
    />

    <textarea
      placeholder="Project description"
      value={projectDescription}
      onChange={(e) => setProjectDescription(e.target.value)}
      rows={3}
      style={{ padding: "0.75rem" }}
    />

    <button
      onClick={handleAddProject}
      style={{
        padding: "0.75rem 1rem",
        cursor: "pointer",
      }}
    >
      Add Project
    </button>
  </div>
</section>

<section style={{ marginTop: "2rem" }}>
  <h2>Create Task</h2>

  <div
    style={{
      display: "grid",
      gap: "0.75rem",
      maxWidth: "500px",
      marginTop: "1rem",
    }}
  >
    <input
      type="text"
      placeholder="Task title"
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      style={{ padding: "0.75rem" }}
      disabled={!selectedProjectId}
    />

    <textarea
      placeholder="Task description"
      value={taskDescription}
      onChange={(e) => setTaskDescription(e.target.value)}
      rows={3}
      style={{ padding: "0.75rem" }}
      disabled={!selectedProjectId}
    />

    <select
      value={taskPriority}
      onChange={(e) =>
        setTaskPriority(e.target.value as "low" | "medium" | "high")
      }
      style={{ padding: "0.75rem" }}
      disabled={!selectedProjectId}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button
      onClick={handleAddTask}
      disabled={!selectedProjectId}
      style={{
        padding: "0.75rem 1rem",
        cursor: selectedProjectId ? "pointer" : "not-allowed",
      }}
    >
      Add Task
    </button>

    {!selectedProjectId && (
      <p style={{ margin: 0 }}>Select a project before adding a task.</p>
    )}
  </div>
</section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Selected Project ID</h2>
        <p>{selectedProject ? selectedProject.name : "No project selected"}</p>
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
        <h2>Task Search and Filters</h2>

        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            marginBottom: "1rem",
            maxWidth: "500px",
          }}
        >
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "0.75rem" }}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "all" | "completed" | "incomplete"
              )
            }
            style={{ padding: "0.75rem" }}
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(
                e.target.value as "all" | "low" | "medium" | "high"
              )
            }
            style={{ padding: "0.75rem" }}
          >
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Tasks for Selected Project</h2>
        {filteredTasks.length === 0 ? (
          <p>No tasks match the current search/filter.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                {editingTaskId === task.id ? (
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Task title"
                      style={{ padding: "0.5rem" }}
                    />

                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Task description"
                      rows={3}
                      style={{ padding: "0.5rem" }}
                    />

                    <select
                      value={editPriority}
                      onChange={(e) =>
                        setEditPriority(
                          e.target.value as "low" | "medium" | "high"
                        )
                      }
                      style={{ padding: "0.5rem" }}
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        onClick={handleSaveEdit}
                        style={{ padding: "0.5rem 0.75rem", cursor: "pointer" }}
                      >
                        Save
                      </button>

                      <button
                        onClick={handleCancelEdit}
                        style={{ padding: "0.5rem 0.75rem", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
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

                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        marginTop: "0.75rem",
                        flexWrap: "wrap",
                      }}
                    >
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
                        onClick={() => handleStartEdit(task.id)}
                        style={{
                          padding: "0.5rem 0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Edit Task
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
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
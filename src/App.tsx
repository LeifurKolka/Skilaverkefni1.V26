import { useMemo, useState } from "react";
import "./index.css";
import { useTaskHubStore } from "./store/useTaskHubStore";
import { useTaskFilters } from "./hooks/useTaskFilters";
import { useSelectedProject } from "./hooks/useSelectedProject";
import { createProjectSchema, createTaskSchema } from "./utils/schemas";
import { DashboardStats } from "./components/dashboard/DashboardStats";
import { ProjectForm } from "./components/forms/ProjectForm";
import { TaskForm } from "./components/forms/TaskForm";
import { ProjectList } from "./components/projects/ProjectList";
import { TaskList } from "./components/tasks/TaskList";
import { TaskFilters } from "./components/tasks/TaskFilters";
import { Box, Container, Typography, Divider, Grid } from "@mui/material";

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

const [projectError, setProjectError] = useState("");
const [taskError, setTaskError] = useState("");

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
  const result = createProjectSchema.safeParse({
    name: projectName,
    description: projectDescription,
  });

  if (!result.success) {
    setProjectError(result.error.issues[0]?.message ?? "Invalid project data");
    return;
  }

  addProject({
    id: crypto.randomUUID(),
    name: result.data.name,
    description: result.data.description,
    createdAt: new Date().toISOString(),
  });

  setProjectName("");
  setProjectDescription("");
  setProjectError("");
};

  const handleAddTask = () => {
  if (!selectedProjectId) return;

  const result = createTaskSchema.safeParse({
    title: taskTitle,
    description: taskDescription,
    priority: taskPriority,
  });

  if (!result.success) {
    setTaskError(result.error.issues[0]?.message ?? "Invalid task data");
    return;
  }

  addTask({
    id: crypto.randomUUID(),
    projectId: selectedProjectId,
    title: result.data.title,
    description: result.data.description,
    completed: false,
    priority: result.data.priority,
    createdAt: new Date().toISOString(),
  });

  setTaskTitle("");
  setTaskDescription("");
  setTaskPriority("medium");
  setTaskError("");
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
  <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#f8f5ff",
      py: 4,
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 3,
          p: { xs: 2, md: 5 },
        }}
      >
        <Typography variant="h3" component="h1" fontWeight="bold">
          Team Task Hub
        </Typography>

        <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
          Manage projects, tasks, filters, and progress in one place.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <DashboardStats
          totalProjects={dashboardStats.totalProjects}
          totalTasks={dashboardStats.totalTasks}
          completedTasks={dashboardStats.completedTasks}
          incompleteTasks={dashboardStats.incompleteTasks}
          highPriorityTasks={dashboardStats.highPriorityTasks}
        />

        <Grid container spacing={4} sx={{ mt: 1 }}>
  <Grid item xs={12} md={4}>
    <ProjectForm
      projectName={projectName}
      projectDescription={projectDescription}
      projectError={projectError}
      onProjectNameChange={(value) => {
        setProjectName(value);
        setProjectError("");
      }}
      onProjectDescriptionChange={(value) => {
        setProjectDescription(value);
        setProjectError("");
      }}
      onSubmit={handleAddProject}
    />

    <ProjectList
      projects={projects}
      selectedProjectId={selectedProjectId}
      onSelectProject={setSelectedProject}
    />
  </Grid>

  <Grid
    item
    xs={12}
    md="auto"
    sx={{
      display: { xs: "none", md: "flex" },
      justifyContent: "center",
    }}
  >
    <Divider orientation="vertical" flexItem />
  </Grid>

  <Grid item xs={12} md>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        Selected Project
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
        {selectedProject ? selectedProject.name : "No project selected"}
      </Typography>
    </Box>

    <TaskForm
      taskTitle={taskTitle}
      taskDescription={taskDescription}
      taskPriority={taskPriority}
      taskError={taskError}
      selectedProjectId={selectedProjectId}
      onTaskTitleChange={(value) => {
        setTaskTitle(value);
        setTaskError("");
      }}
      onTaskDescriptionChange={(value) => {
        setTaskDescription(value);
        setTaskError("");
      }}
      onTaskPriorityChange={(value) => {
        setTaskPriority(value);
        setTaskError("");
      }}
      onSubmit={handleAddTask}
    />

    <TaskFilters
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      priorityFilter={priorityFilter}
      onSearchTermChange={setSearchTerm}
      onStatusFilterChange={setStatusFilter}
      onPriorityFilterChange={setPriorityFilter}
    />

    <TaskList
      tasks={filteredTasks}
      editingTaskId={editingTaskId}
      editTitle={editTitle}
      editDescription={editDescription}
      editPriority={editPriority}
      onEditTitleChange={setEditTitle}
      onEditDescriptionChange={setEditDescription}
      onEditPriorityChange={setEditPriority}
      onStartEdit={handleStartEdit}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      onToggleTask={toggleTaskCompletion}
      onDeleteTask={deleteTask}
    />
  </Grid>
</Grid>
      </Box>
    </Container>
  </Box>
);
}

export default App;
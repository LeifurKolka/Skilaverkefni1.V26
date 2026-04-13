import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

interface TaskFormProps {
  taskTitle: string;
  taskDescription: string;
  taskPriority: "low" | "medium" | "high";
  taskError: string;
  selectedProjectId: string | null;
  onTaskTitleChange: (value: string) => void;
  onTaskDescriptionChange: (value: string) => void;
  onTaskPriorityChange: (value: "low" | "medium" | "high") => void;
  onSubmit: () => void;
}

export function TaskForm({
  taskTitle,
  taskDescription,
  taskPriority,
  taskError,
  selectedProjectId,
  onTaskTitleChange,
  onTaskDescriptionChange,
  onTaskPriorityChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Create Task
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          maxWidth: 500,
          mt: 2,
        }}
      >
        <TextField
          label="Task title"
          value={taskTitle}
          onChange={(e) => onTaskTitleChange(e.target.value)}
          fullWidth
          disabled={!selectedProjectId}
        />

        <TextField
          label="Task description"
          value={taskDescription}
          onChange={(e) => onTaskDescriptionChange(e.target.value)}
          multiline
          minRows={3}
          fullWidth
          disabled={!selectedProjectId}
        />

        <TextField
          select
          label="Priority"
          value={taskPriority}
          onChange={(e) =>
            onTaskPriorityChange(e.target.value as "low" | "medium" | "high")
          }
          fullWidth
          disabled={!selectedProjectId}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        {taskError && <Alert severity="error">{taskError}</Alert>}

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!selectedProjectId}
        >
          Add Task
        </Button>

        {!selectedProjectId && (
          <Typography variant="body2" color="text.secondary">
            Select a project before adding a task.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
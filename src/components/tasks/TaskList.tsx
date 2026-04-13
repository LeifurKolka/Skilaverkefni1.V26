import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Task } from "../../types/task";

interface TaskListProps {
  tasks: Task[];
  editingTaskId: string | null;
  editTitle: string;
  editDescription: string;
  editPriority: "low" | "medium" | "high";
  onEditTitleChange: (value: string) => void;
  onEditDescriptionChange: (value: string) => void;
  onEditPriorityChange: (value: "low" | "medium" | "high") => void;
  onStartEdit: (taskId: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({
  tasks,
  editingTaskId,
  editTitle,
  editDescription,
  editPriority,
  onEditTitleChange,
  onEditDescriptionChange,
  onEditPriorityChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Tasks for Selected Project
      </Typography>

      {tasks.length === 0 ? (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No tasks match the current search/filter.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            mt: 2,
          }}
        >
          {tasks.map((task) => (
            <Card key={task.id} sx={{ borderRadius: 2 }}>
              <CardContent>
                {editingTaskId === task.id ? (
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Task title"
                      value={editTitle}
                      onChange={(e) => onEditTitleChange(e.target.value)}
                      fullWidth
                    />

                    <TextField
                      label="Task description"
                      value={editDescription}
                      onChange={(e) => onEditDescriptionChange(e.target.value)}
                      multiline
                      minRows={3}
                      fullWidth
                    />

                    <TextField
                      select
                      label="Priority"
                      value={editPriority}
                      onChange={(e) =>
                        onEditPriorityChange(
                          e.target.value as "low" | "medium" | "high"
                        )
                      }
                      fullWidth
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </TextField>

                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" onClick={onSaveEdit}>
                        Save
                      </Button>

                      <Button variant="outlined" onClick={onCancelEdit}>
                        Cancel
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </Typography>

                    <Typography sx={{ mt: 1 }} color="text.secondary">
                      {task.description}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                      <strong>Priority:</strong> {task.priority}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      <strong>Status:</strong>{" "}
                      {task.completed ? "Completed" : "Incomplete"}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        onClick={() => onToggleTask(task.id)}
                      >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => onStartEdit(task.id)}
                      >
                        Edit Task
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        Delete Task
                      </Button>
                    </Stack>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
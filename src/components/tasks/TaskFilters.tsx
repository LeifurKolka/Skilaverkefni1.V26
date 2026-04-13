import { Box, MenuItem, TextField, Typography } from "@mui/material";

interface TaskFiltersProps {
  searchTerm: string;
  statusFilter: "all" | "completed" | "incomplete";
  priorityFilter: "all" | "low" | "medium" | "high";
  onSearchTermChange: (value: string) => void;
  onStatusFilterChange: (value: "all" | "completed" | "incomplete") => void;
  onPriorityFilterChange: (
    value: "all" | "low" | "medium" | "high"
  ) => void;
}

export function TaskFilters({
  searchTerm,
  statusFilter,
  priorityFilter,
  onSearchTermChange,
  onStatusFilterChange,
  onPriorityFilterChange,
}: TaskFiltersProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Task Search and Filters
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
          label="Search tasks"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(
              e.target.value as "all" | "completed" | "incomplete"
            )
          }
          fullWidth
        >
          <MenuItem value="all">All statuses</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="incomplete">Incomplete</MenuItem>
        </TextField>

        <TextField
          select
          label="Priority"
          value={priorityFilter}
          onChange={(e) =>
            onPriorityFilterChange(
              e.target.value as "all" | "low" | "medium" | "high"
            )
          }
          fullWidth
        >
          <MenuItem value="all">All priorities</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}
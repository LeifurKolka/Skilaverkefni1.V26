import { Box, Button, TextField, Typography, Alert } from "@mui/material";

interface ProjectFormProps {
  projectName: string;
  projectDescription: string;
  projectError: string;
  onProjectNameChange: (value: string) => void;
  onProjectDescriptionChange: (value: string) => void;
  onSubmit: () => void;
}

export function ProjectForm({
  projectName,
  projectDescription,
  projectError,
  onProjectNameChange,
  onProjectDescriptionChange,
  onSubmit,
}: ProjectFormProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Create Project
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
          label="Project name"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          fullWidth
        />

        <TextField
          label="Project description"
          value={projectDescription}
          onChange={(e) => onProjectDescriptionChange(e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        {projectError && <Alert severity="error">{projectError}</Alert>}

        <Button variant="contained" onClick={onSubmit}>
          Add Project
        </Button>
      </Box>
    </Box>
  );
}
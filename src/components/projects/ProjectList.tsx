import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import type { Project } from "../../types/project";

interface ProjectListProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
}

export function ProjectList({
  projects,
  selectedProjectId,
  onSelectProject,
}: ProjectListProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Projects
      </Typography>

      {projects.length === 0 ? (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No projects yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            mt: 2,
          }}
        >
          {projects.map((project) => {
            const isSelected = project.id === selectedProjectId;

            return (
              <Card
                key={project.id}
                sx={{
                  border: isSelected ? "2px solid" : "1px solid",
                  borderColor: isSelected ? "primary.main" : "divider",
                  backgroundColor: isSelected ? "action.selected" : "background.paper",
                  borderRadius: 2,
                }}
              >
                <CardActionArea onClick={() => onSelectProject(project.id)}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {project.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {project.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
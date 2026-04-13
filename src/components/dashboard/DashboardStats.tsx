interface DashboardStatsProps {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  incompleteTasks: number;
  highPriorityTasks: number;
}

export function DashboardStats({
  totalProjects,
  totalTasks,
  completedTasks,
  incompleteTasks,
  highPriorityTasks,
}: DashboardStatsProps) {
  return (
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
          <p>{totalProjects}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Incomplete</h3>
          <p>{incompleteTasks}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h3 style={{ marginTop: 0 }}>High Priority</h3>
          <p>{highPriorityTasks}</p>
        </div>
      </div>
    </section>
  );
}
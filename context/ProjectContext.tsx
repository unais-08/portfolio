"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Project } from "@/types/projects";

interface ProjectContextType {
  projects: Project[];
  error: string | null;
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  error: null,
  loading: false,
});

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data: Project[] = await res.json();
        const parsedData = data.map((project) => ({
          ...project,
          tech_stack:
            typeof project.tech_stack === "string"
              ? JSON.parse(project.tech_stack)
              : project.tech_stack,
        }));

        setProjects(parsedData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching projects:", err);
        setError(err.message || "An unexpected error occurred.");
        toast.error(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, error, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);

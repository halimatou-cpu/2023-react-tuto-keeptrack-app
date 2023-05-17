import React from "react";
import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface Props {
  projects: Project[];
  onMoreClick: () => void;
  // onSave: (project: Project) => void;
}

export default function ProjectList({ projects, onMoreClick }: Props) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => setProjectBeingEdited({});

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {project === projectBeingEdited ? (
            <ProjectForm project={project} onCancel={cancelEditing} />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
      {projects.length > 0 && (
        <button className="pagination" onClick={onMoreClick}>
          <span className="icon-link" /> Next
        </button>
      )}
    </div>
  );
}

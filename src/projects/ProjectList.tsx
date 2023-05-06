import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface Props {
  projects: Project[];
  onSave: (project: Project) => void;
}

export default function ProjectList(props: Props) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const { projects, onSave } = props;

  const handleEdit = (project: Project) => {
    console.log("Editing: ", project);
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => setProjectBeingEdited({});

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {project === projectBeingEdited ? (
            <ProjectForm onCancel={cancelEditing} onSave={onSave} />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );
}

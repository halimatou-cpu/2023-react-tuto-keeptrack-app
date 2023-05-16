import React from "react";
import { Link } from "react-router-dom";
import { Project } from "./Project";

interface Props {
  project: Project;
  onEdit: (project: Project) => void;
}

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

export default function ProjectCard(props: Props) {
  const { project, onEdit } = props;
  const handleEditClick = (projectToEdit: Project) => {
    onEdit(projectToEdit);
  };
  return (
    <div className="card" style={{ display: "flex" }}>
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <Link to={"/projects/" + project.id}>
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button
          className="inverse bordered"
          onClick={() => handleEditClick(project)}
        >
          <span className="icon-edit inverse" />
          Edit
        </button>
      </section>
    </div>
  );
}

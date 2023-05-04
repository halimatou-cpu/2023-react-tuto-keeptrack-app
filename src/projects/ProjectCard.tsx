import { Project } from "./Project";

interface Props {
  project: Project;
}

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
  //   return description;
}

export default function ProjectCard(props: Props) {
  const { project } = props;
  const handleEditClick = (projectToEdit: Project) => {
    console.log(projectToEdit);
  };
  return (
    <div className="card" style={{ display: "flex" }}>
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
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

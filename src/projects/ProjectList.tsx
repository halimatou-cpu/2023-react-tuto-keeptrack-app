import { Project } from "./Project";

interface Props {
  projects: Project[];
}

export default function ProjectList(props: Props) {
  const projects = props.projects;
  // return <pre>{JSON.stringify(projects, null, ' ')}</pre>
  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
              <h5 className="strong">
                <strong>{project.name}</strong>
              </h5>
              <p>{project.description}</p>
              <p>Budget : {project.budget.toLocaleString()}</p>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
}

import { Project } from "./Project";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
}

export default function ProjectList(props: Props) {
  const projects = props.projects;
  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

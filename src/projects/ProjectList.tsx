import { Project } from "./Project";

interface Props {
	projects: Project[];
}

export default function ProjectList(props: Props) {
	const projects = props.projects;
	return <pre>{JSON.stringify(projects, null, ' ')}</pre>
}
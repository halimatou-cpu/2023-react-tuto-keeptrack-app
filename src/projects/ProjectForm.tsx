import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface Props {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  project: initialProject,
  onSave,
  onCancel,
}: Props) {
  //   const { project: initialProject, onSave, onCancel } = props; // project is renamed initialProject

  const [project, setProject] = useState(initialProject);
  //   const [name, setName] = useState(initialProject.name);
  //   const [description, setDescription] = useState(initialProject.description);
  //   const [budget, setBudget] = useState(initialProject.budget);
  //   const [isActive, setIsActive] = useState(initialProject.isActive);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(project);
    onCancel();
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (type === "number") updatedValue = Number(updatedValue);
    const change = {
      [name]: updatedValue,
    };
    let updatedProject: Project;
    setProject((previous) => {
      updatedProject = new Project({ ...previous, ...change });
      return updatedProject;
    });
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      <label htmlFor="isActive">Active ?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button type="submit" className="primary bordered medium">
          Save
        </button>
        <button type="reset" onClick={onCancel} className="bordered medium">
          Cancel
        </button>
      </div>
    </form>
  );
}

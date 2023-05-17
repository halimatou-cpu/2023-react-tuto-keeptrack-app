import React from "react";
import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ProjectState } from "./state/projectTypes";
import { saveProject } from "./state/projectActions";

interface Props {
  project: Project;
  // onSave: (project: Project) => void;
  onCancel: () => void;
}

function ErrorComponent(props: { msg: string }) {
  const { msg } = props;
  return (
    <div className="card error">
      <p>{msg}</p>
    </div>
  );
}

export default function ProjectForm({
  project: initialProject, // project is renamed initialProject
  // onSave,
  onCancel,
}: Props) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    // onSave(project);
    dispatch(saveProject(project));
    // onCancel();
  };

  const validate = (project: Project) => {
    let updatedErrors = { name: "", description: "", budget: "" };
    if (project.name.length === 0) updatedErrors.name = "Name is required !";
    if (project.name.length > 0 && project.name.length < 3)
      updatedErrors.name = "Name needs to be at least 3 characters long !";
    if (
      project.description === undefined ||
      updatedErrors.description.length === 0
    )
      errors.description = "Description is required !";
    if (project.budget <= 0)
      updatedErrors.budget = "Budget must be greater than $0 !";
    return updatedErrors;
  };

  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
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
    setErrors(() => validate(updatedProject));
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
      {errors.name.length > 0 && <ErrorComponent msg={errors.name} />}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 && (
        <ErrorComponent msg={errors.description} />
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && <ErrorComponent msg={errors.budget} />}
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

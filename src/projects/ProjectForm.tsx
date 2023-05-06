import { SyntheticEvent } from "react";
import { Project } from "./Project";

interface Props {
  onCancel: () => void;
  onSave: (project: Project) => void;
}

export default function ProjectForm(props: Props) {
  const onCancel = props.onCancel;
  const onSave = props.onSave;

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(new Project({ name: "Updated Project" }));
	onCancel();
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" />
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        id=""
        placeholder="enter description"
      ></textarea>
      <label htmlFor="budget">Project Budget</label>
      <input type="text" name="budget" id="" placeholder="enter budget" />
      <label htmlFor="isActive">Active ?</label>
      <input type="checkbox" name="isActive" />
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

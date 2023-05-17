import React, { Fragment, useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { projectAPI } from "./projectApi";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { error } from "console";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ProjectState } from "./state/projectTypes";
import { AnyAction } from "redux";
import { loadProjects } from "./state/projectActions";

function ProjectsPage() {
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | undefined | null>(undefined);

  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  );
  const projects = useSelector(
    (appState: AppState) => appState.projectState.projects
  );
  const error = useSelector(
    (appState: AppState) => appState.projectState.error
  );
  const currentPage = useSelector(
    (appState: AppState) => appState.projectState.page
  );
  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  // useEffect(() => {
  //   setLoading(true);
  //   projectAPI
  //     .get(1)
  //     .then((data) => {
  //       setError(null);
  //       setLoading(false);
  //       setProjects(data);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       setError(e.message);
  //       if (e instanceof Error) {
  //         setError(e.message);
  //       }
  //     });
  // }, [currentPage]);

  // const saveProject = (project: Project) => {
  //   projectAPI
  //     .put(project)
  //     .then((updatedProject) => {
  //       let updatedProjects = projects.map((p: Project) => {
  //         return p.id === project.id ? new Project(updatedProject) : p;
  //       });
  //       setProjects(updatedProjects);
  //     })
  //     .catch((e) => {
  //       if (e instanceof Error) setError(e.message);
  //     });
  // };

  useEffect(() => {
    dispatch(loadProjects(1));
  }, [dispatch]);

  const handleMoreClick = () => {
    dispatch(loadProjects(currentPage + 1));
  }

  return (
    <Fragment>
      {/* <h1>Projects</h1> */}
      {error && (
        <div className="row">
          <div className="card fluid error">
            <section>
              <p>
                <span className="icon-alert inverse " />
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projects} />
      {loading && (
        <div className="center-page">
          <span className="spinner primary" />
          <p>Loading...</p>
        </div>
      )}
    </Fragment>
  );
}

export default ProjectsPage;

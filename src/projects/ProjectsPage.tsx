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

  useEffect(() => {
    dispatch(loadProjects(1));
  }, [dispatch]);

  const handleMoreClick = () => {
    dispatch(loadProjects(currentPage + 1));
  }

  return (
    <Fragment>
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
      <ProjectList projects={projects} onMoreClick={handleMoreClick} />
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

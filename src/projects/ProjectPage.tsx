import React, { useEffect, useState } from "react";
import { projectAPI } from "./projectApi";
import ProjectDetail from "./ProjectDetail";
import { Project } from "./Project";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { useDispatch } from "react-redux";
import { loadProject } from "./state/projectActions";
import { ThunkDispatch } from "redux-thunk";
import { ProjectState } from "./state/projectTypes";
import { AnyAction } from "redux";

function ProjectPage(props: any) {
  // const [loading, setLoading] = useState(false);
  // const [project, setProject] = useState<Project | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params.id);

  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  );
  const error = useSelector(
    (appState: AppState) => appState.projectState.error
  );
  const project = useSelector(
    (appState: AppState) => appState.projectState.currentProject
  );

  useEffect(() => {
    dispatch(loadProject(id));
  }, [id])

  // useEffect(() => {
  //   setLoading(true);
  //   projectAPI
  //     .find(id)
  //     .then((data) => {
  //       setProject(data);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setError(e);
  //       setLoading(false);
  //     });
  // }, [id]);

  return (
    <div>
      <>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {project && <ProjectDetail project={project} />}
      </>
    </div>
  );
}

export default ProjectPage;

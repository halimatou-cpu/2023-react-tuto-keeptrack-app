import React, { Fragment, useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { projectAPI } from "./projectApi";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined | null>(undefined);

  // const fetchProjects = () => {
  //   return projectApi.get();
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   projectApi
  //   .get()
  //   .then((data) => {
  //     setError(null);
  //     setLoading(false);
  //     setProjects(data)
  //   })
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .get(1)
      .then((data) => {
        setError(null);
        setLoading(false);
        setProjects(data);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  }, []);

  const saveProject = (project: Project) => {
    console.log("Saving project ", project);
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };

  return (
    <Fragment>
      <h1>Projects</h1>
      {error && <div className="row">
        <div className="card fluid error">
          <section>
            <p>
              <span className="icon-alert inverse " />
              {error}
            </p>
          </section>
        </div>
      </div>}
      <ProjectList projects={projects} onSave={saveProject} />
      {loading && <div className="center-page">
        <span className="spinner primary" />
        <p>Loading...</p>
      </div>}
    </Fragment>
  );
}

export default ProjectsPage;

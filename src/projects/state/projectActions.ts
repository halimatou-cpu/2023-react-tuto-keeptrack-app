import { ThunkAction } from "redux-thunk";
import { LOAD_PROJECTS_FAILURE, LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, LOAD_PROJECT_REQUEST, LOAD_PROJECT_SUCCESS, ProjectState, SAVE_PROJECT_FAILURE, SAVE_PROJECT_REQUEST, SAVE_PROJECT_SUCCESS } from "./projectTypes";
import { Action } from "redux";
import { projectAPI } from "../projectApi";
import { Project } from "../Project";
import { LOAD_PROJECT_FAILURE } from "./projectTypes";

export function loadProjects(page: number = 1): ThunkAction<void, ProjectState, null, Action<string>> {
	return async (dispatch: any) => {
		dispatch({ type: LOAD_PROJECTS_REQUEST });
		return projectAPI.get(page)
			.then((data) => {
				dispatch({
					type: LOAD_PROJECTS_SUCCESS,
					payload: {
						projects: data,
						page
					}
				})
			})
			.catch((error) => {
				dispatch({
					type: LOAD_PROJECTS_FAILURE,
					payload: error
					// payload : {message: error.message}
				})
			})
	}
}

export function saveProject(project: Project): ThunkAction<void, ProjectState, null, Action<string>> {
	return async (dispatch: any) => {
		dispatch({ type: SAVE_PROJECT_REQUEST });
		return projectAPI
			.put(project)
			.then((data) => {
				dispatch({
					type: SAVE_PROJECT_SUCCESS,
					payload: data
				});
			})
			.catch((error) => {
				dispatch({
					type: SAVE_PROJECT_FAILURE,
					payload: error
				})
			})
	}
}

export function loadProject(id: number): ThunkAction<void, ProjectState, null, Action<string>> {
	return async (dispatch: any) => {
		dispatch({ type: LOAD_PROJECT_REQUEST })
		return projectAPI
			.find(id)
			.then((project) => {
				dispatch({
					type: LOAD_PROJECT_SUCCESS,
					payload: project
				})
			})
			.catch((error) => {
				dispatch({
					type: LOAD_PROJECT_FAILURE,
					payload: error
				})
			})
	}
}
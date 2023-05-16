import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { initialProjectState, projectReducer } from "./projects/state/projectReducer";
import { ProjectState } from "./projects/state/projectTypes";

const reducer = combineReducers({
	projectState: projectReducer
});

function configureStore(preloadedState: any) {
	const middlewares = [ReduxThunk];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	//Thunk is middleware
	//DevTools is an enhancer (actually changes Redux)
	//applyMiddleware wraps middleware and returns an enhancer

	// to use only thunk middleware
	// const enhancer = compose(middlewareEnhancer);

	//to use thunk & devTools
	const enhancer = composeWithDevTools(middlewareEnhancer);

	const store = createStore(reducer, preloadedState, enhancer);
	return store;
}

export interface AppState {
	projectState: ProjectState;
}

export const initialAppState: AppState = {
	projectState: initialProjectState
};

const store = configureStore(initialAppState);
export default store;
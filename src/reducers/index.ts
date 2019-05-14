import { Reducer, combineReducers } from "redux";
import PlanetsReducer from "./planets";
import { ReducerPlanetsProps } from "../utils/Types";

export interface ApplicationState {
  planets: ReducerPlanetsProps
}

export const rootReducers: Reducer<ApplicationState> = combineReducers({
  planets: PlanetsReducer,
})
import { HttpAddress, FETCH_ALL_PLANETS, SET_SINGLE_PLANET, SET_PLANET_DETAILS } from "../../utils/globals";
import { ActionCreator, Dispatch } from "redux";
import { queryAllPlanets, queryPlanetDetails } from "./queryData";
import { iPlanets, iSinglePlanet } from "../../utils/Types";

const postHeaders = (data: string) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query: data })
  }
}

export const saveALlPlanets = (data: iPlanets[]) => {
  return {
    type: FETCH_ALL_PLANETS,
    fetchPlanets: data
  }
}

export const setSingleID = (id: string) => {
  return {
    type: SET_SINGLE_PLANET,
    planetID: id
  }
}

export const setPlanetDetails = (details: iSinglePlanet | undefined) => {
  return {
    type: SET_PLANET_DETAILS,
    details
  }
}

export const fetchPlantes: ActionCreator<any> = () => {
  return async (dispatch: Dispatch) => {
    try {
      fetch(HttpAddress, postHeaders(queryAllPlanets))
        .then(r => r.json())
        .then(response => {
          dispatch(saveALlPlanets(response.data.allPlanets.planets))
          return response;
        });
    } catch (error) {
      console.log("fetchPlantes", error)
    }
  }
}

export const fetchPlanetDetails: ActionCreator<any> = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      fetch(HttpAddress, postHeaders(queryPlanetDetails(id)))
        .then(r => r.json())
        .then(response => {
          dispatch(setPlanetDetails(response.data.planet))
        });
    } catch (error) {
      console.log("fetchPlanetDetails", error)
    }
  }
}


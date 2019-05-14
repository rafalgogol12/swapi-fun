import { FETCH_ALL_PLANETS, SET_SINGLE_PLANET, SET_PLANET_DETAILS } from "../utils/globals";

const initialState = {
  all: undefined,
  singlePlanetID: undefined,
  planetDetails: undefined
}

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_ALL_PLANETS:
      return {
        ...state,
        all: action.fetchPlanets
      };
    case SET_SINGLE_PLANET:
      return {
        ...state,
        singlePlanetID: action.planetID
      }
    case SET_PLANET_DETAILS:
      return {
        ...state,
        planetDetails: action.details
      }
    default:
      return state
  }
};
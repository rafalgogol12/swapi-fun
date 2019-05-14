export const queryAllPlanets = "{allPlanets { planets { name terrains population id }}}";

export const queryPlanetDetails = (id: string) => {
  return `{
    planet(id: "${id}") {
      name
      diameter
      rotationPeriod
      orbitalPeriod
      gravity
      population
      climates
      terrains
      surfaceWater
      created
      edited
      residentConnection {
        edges {
          node {
            name
          }
        }
      }
      filmConnection {
        edges {
          node {
            title
          }
        }
      }

    }
  }`
}
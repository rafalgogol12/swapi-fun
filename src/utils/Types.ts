export interface iPlanets {
  id: string
  name: string
  population: number
  terrains: string[]
}

export interface iSinglePlanet {
  climates: string[]
  created: string
  diameter: number
  edited: string
  filmConnection: iFilm
  gravity: string
  name: string
  orbitalPeriod: number
  population: number
  residentConnection: iResident
  rotationPeriod: number
  surfaceWater: number
  terrains: string[]
}

export interface iFilm {
  edges: iEdgesFilm[]
}

export interface iEdgesFilm {
  node: iNodeFilm
}

export interface iNodeFilm {
  title: string
}

export interface iResident {
  edges: iEdgesResident[]
}

export interface iEdgesResident {
  node: iNodeResident
}

export interface iNodeResident {
  name: string
}


export interface PaginationProps {
  items: iPlanets[]
  initialPage: number
  pageSize: number
  onChangePage: (page: any) => void
}

export interface PaginationState {
  pager: iPager
}

export interface iPager {
  currentPage: number
  endIndex: number
  endPage: number
  pageSize: number
  pages: number[]
  startIndex: number
  startPage: number
  totalItems: number
  totalPages: number
}

export class iPager {
  constructor(
    public currentPage: number,
    public endIndex: number,
    public endPage: number,
    public pageSize: number,
    public pages: number[],
    public startIndex: number,
    public startPage: number,
    public totalItems: number,
    public totalPages: number
  ) { }
}

export interface ButtonProps {
  active?: boolean
}

export interface RoutesProps {
  planet: iSinglePlanet
}

export interface ReducerPlanetsProps {
  all: iPlanets[]
  singlePlanetID: string
  planetDetails: iSinglePlanet
}
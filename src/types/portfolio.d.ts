import { ProjectImageData } from "./query"

export interface ProjectGridDatum {
  title: string
  description: string
  technologies: string[]
  firstReleased: Date
  mainLink?: string
  repoLink?: string
  hostedOn?: string
  image?: ProjectImageData
}

export interface ProjectGridData {
  projects: ProjectGridDatum[]
  highlightedProjectTitles: Set<string>
  viewedTechs: Set<string>
  handleMouseEnter: (title: string) => void
  handleMouseLeave: () => void
}

export interface SVGData {
  xMovement: number
  yMovement: number
}

export type SVGShapeData = SVGData & ChildrenProp

export interface ProjectFiltersData {
  allTechs: string[]
  viewedTechs: Set<string>
  onToggle: (tech: string) => void
  onToggleTentativeTech: (tech: string) => void
}

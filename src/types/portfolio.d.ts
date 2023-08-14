

export interface ProjectGridDatum {
  title: string
  description: string
  technologies: string[]
  firstReleased: Date
  mainLink?: string;
  repoLink?: string;
  hostedOn?: string;
}

export interface ProjectGridData {
  projects: ProjectGridDatum[]
  ghIcon: string
  hovered: string | null
  viewedTechs: Set<string>
  handleMouseEnter: (title: string) => void
  handleMouseLeave: () => void
}

export interface SVGData {
  xMovement: number,
  yMovement: number,
}

export type SVGShapeData = SVGData & ChildrenProp

export interface ProjectFiltersData {
  allTechs: string[]
  viewedTechs: Set<string>
  onToggle: (tech: string) => void
}
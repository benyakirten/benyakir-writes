
export interface ProjectGridDatum {
  description: string
  title: string
  technologies: string[]
}
export interface ProjectGridData {
  projects: ProjectGridDatum[]
  ghIcon: string
  hovered: string | null
  viewedTechs: Set<string>
  handleMouseEnter: (title: string) => void
  handleMouseLeave: () => void
}

export interface SVGSize {
  size?: number
}

export interface ProjectFiltersData {
  allTechs: string[]
  viewedTechs: Set<string>
  onToggle: (tech: string) => void
}
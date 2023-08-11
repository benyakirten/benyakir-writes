import React from "react"

export interface ProjectGridDatum {
  description: string
  title: string
  technologies: string[]
  ghLink?: string
  deployedLink?: string
  ref: React.RefObject<HTMLDivElement>
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
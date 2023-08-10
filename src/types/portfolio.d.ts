import type { FileNode } from "./props"

export interface ProjectGridDatum {
  description: string
  title: string
  technologies: string[]
}
export interface ProjectGridData {
  projects: ProjectGridDatum[]
  ghIcon: string
  hovered: string | null
  handleMouseEnter: (title: string) => void
  handleMouseLeave: () => void
}

export interface SVGSize {
  size: number
}
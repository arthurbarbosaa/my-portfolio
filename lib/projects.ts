import projectData from "@/data/project-data.json"

export type ProjectTechnology = {
  name: string
  icon?: string
}

export type Project = {
  id: string
  name: string
  image: string
  year: number
  description: string
  technologies: ProjectTechnology[]
  visitUrl: string
}

export const projects = projectData as Project[]
export type ProjectId = Project["id"]

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId)
}

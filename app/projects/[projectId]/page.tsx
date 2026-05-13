import { notFound } from "next/navigation"

import { getProjectById } from "@/lib/projects"
import { ProjectDetail } from "./project-detail"

type ProjectPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params
  const project = getProjectById(projectId)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}

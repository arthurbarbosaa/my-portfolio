"use client"

import { useMemo, useState } from "react"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { projects, type ProjectId } from "@/lib/projects"

export default function ProjectsPage() {
  const router = useRouter()
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId>(
    projects[0].id
  )

  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.id === selectedProjectId) ??
      projects[0],
    [selectedProjectId]
  )

  return (
    <section className="flex min-h-svh items-center justify-center">
      <motion.div
        className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* LEFT */}
        <motion.div
          className="flex flex-col items-center justify-center gap-6 text-center md:items-start md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Projects
          </h1>

          <div className="flex w-full max-w-sm flex-col gap-3">
            {projects.map((project) => {
              const isActive = project.id === selectedProjectId

              return (
                <Button
                  key={project.id}
                  type="button"
                  onClick={() => router.push(`/projects/${project.id}`)}
                  onMouseEnter={() => setSelectedProjectId(project.id)}
                  onFocus={() => setSelectedProjectId(project.id)}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive
                      ? ""
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {project.name}
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mx-auto w-full max-w-xl"
            >
              <Card className="gap-0 overflow-hidden bg-transparent py-0 ring-0">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

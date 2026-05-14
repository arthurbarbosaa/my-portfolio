"use client"

import { useMemo, useState } from "react"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { projects, type ProjectId } from "@/lib/projects"

const EASE = [0.22, 1, 0.36, 1] as const

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: EASE },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.54, delay: 0.08 * index, ease: EASE },
  }),
}

export default function ProjectsPage() {
  const router = useRouter()
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(
    null
  )

  const selectedProject = useMemo(
    () =>
      selectedProjectId
        ? projects.find((project) => project.id === selectedProjectId)
        : undefined,
    [selectedProjectId]
  )

  return (
    <section className="flex min-h-svh items-center justify-center">
      <motion.div
        className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* LEFT */}
        <motion.div
          className="flex flex-col items-center justify-center gap-6 text-center md:items-start md:text-left"
          variants={lineVariants}
        >
          <motion.h1
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
            variants={lineVariants}
          >
            Projects
          </motion.h1>

          <div className="flex w-full max-w-sm flex-col gap-3">
            {projects.map((project, index) => {
              const isActive = project.id === selectedProjectId

              return (
                <motion.div
                  key={project.id}
                  variants={buttonVariants}
                  custom={index}
                  initial="hidden"
                  animate="show"
                >
                  <Button
                    type="button"
                    onClick={() => router.push(`/projects/${project.id}`)}
                    onMouseEnter={() => setSelectedProjectId(project.id)}
                    onFocus={() => setSelectedProjectId(project.id)}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-center md:justify-start ${
                      isActive
                        ? ""
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {project.name}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={lineVariants} className="hidden md:block">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key={selectedProject.id}
                initial={{
                  opacity: 0,
                  y: 14,
                  scale: 0.985,
                  filter: "blur(8px)",
                }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, scale: 1.01, filter: "blur(6px)" }}
                transition={{ duration: 0.2, ease: EASE }}
                className="mx-auto w-full max-w-xl"
              >
                <Card className="gap-0 overflow-hidden bg-transparent py-0 ring-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={selectedProject.media.poster}
                      alt={selectedProject.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

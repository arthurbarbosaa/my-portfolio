"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/projects"
import { useState } from "react"

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
    transition: { duration: 0.74, ease: EASE },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, delay: 0.08 * index, ease: EASE },
  }),
}

type ProjectDetailProps = {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="flex min-h-svh items-center justify-center">
      <motion.div
        className="grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={lineVariants}>
          <Card className="mx-auto w-full max-w-xl gap-0 overflow-hidden bg-transparent py-0 ring-0 md:mx-0">
            <div className="relative aspect-[16/10] w-full">
              {project.media.kind === "video" && (
                <video
                  onCanPlayThrough={() => setLoaded(true)}
                  className={`h-full w-full object-cover transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={project.media.poster}
                  aria-label={`${project.name} demo video`}
                >
                  {project.media.sources.map((source, index) => (
                    <source key={index} src={source.src} type={source.type} />
                  ))}
                </video>
              )}

              {project.media.kind === "gif" && (
                <Image
                  src={project.media.sources[0].src}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              )}

              {project.media.kind === "image" && (
                <Image
                  src={project.media.poster}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="flex h-full flex-col items-center justify-center gap-6 text-center"
          variants={containerVariants}
        >
          <motion.h1
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
            variants={lineVariants}
          >
            {project.name}
          </motion.h1>

          <motion.p
            className="text-base text-muted-foreground sm:text-lg"
            variants={lineVariants}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-4"
            variants={containerVariants}
          >
            <motion.p
              className="text-sm text-muted-foreground"
              variants={lineVariants}
            >
              <span className="font-semibold text-foreground">Year:</span>{" "}
              {project.year}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-2"
              variants={containerVariants}
            >
              {project.technologies.map((technology, index) => {
                const name =
                  typeof technology === "string" ? technology : technology.name
                const icon =
                  typeof technology === "string" ? undefined : technology.icon

                if (!icon) {
                  return null
                }

                return (
                  <motion.div
                    key={`${name}-${index}`}
                    variants={buttonVariants}
                    custom={index}
                  >
                    <Button
                      type="button"
                      title={name}
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Image src={icon} alt={name} width={16} height={16} />
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>

            {project.visitUrl?.trim() && (
              <motion.div
                variants={buttonVariants}
                custom={project.technologies.length}
              >
                <Button size="lg" className="mt-2">
                  <Link
                    href={project.visitUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

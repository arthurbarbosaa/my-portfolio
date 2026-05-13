"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/projects"

type ProjectDetailProps = {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section className="flex min-h-svh items-center justify-center px-6 py-10 sm:py-14">
      <div className="grid w-full max-w-6xl items-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="mx-auto w-full max-w-xl gap-0 overflow-hidden bg-transparent py-0 ring-0 md:mx-0">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 45vw, 95vw"
                className="object-cover"
                priority
              />
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="flex h-full flex-col items-center justify-center gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.name}
          </h1>

          <p className="text-base text-muted-foreground sm:text-lg">
            {project.description}
          </p>

          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Ano:</span>{" "}
              {project.year}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((technology, index) => {
                const name =
                  typeof technology === "string" ? technology : technology.name
                const icon =
                  typeof technology === "string" ? undefined : technology.icon

                if (!icon) {
                  return null
                }

                return (
                  <Button
                    type="button"
                    key={`${name}-${index}`}
                    title={name}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Image src={icon} alt={name} width={16} height={16} />
                  </Button>
                )
              })}
            </div>

            <Button size="lg" className="mt-2">
              <Link href={project.visitUrl} target="_blank" rel="noreferrer">
                Visitar projeto
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

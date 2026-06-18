"use client"

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import Link from "next/link"

const EASE = [0.22, 1, 0.36, 1] as const

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
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
    transition: { duration: 0.75, ease: EASE },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: EASE },
  },
}

export default function Page() {
  return (
    <section className="flex min-h-svh items-center justify-center">
      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <motion.h1
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
            variants={lineVariants}
          >
            I make <span className="text-primary">websites</span>.
          </motion.h1>
          <motion.p
            className="text-base text-muted-foreground sm:text-lg"
            variants={lineVariants}
          >
            Hi, I&apos;m Arthur Barbosa, and I turn ideas into modern web
            experiences.
          </motion.p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.div variants={buttonVariants}>
            <Button variant="outline" size="lg">
              <Link href="/projects">View projects</Link>
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <Button variant="outline" size="lg">
              <Link href="/about">More about me</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import Link from "next/link"

export default function Page() {
  return (
    <section className="flex min-h-svh items-center justify-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-16 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <motion.h1
            className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            I make <span className="text-primary">websites</span>.
          </motion.h1>
          <motion.p
            className="text-base text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            Olá, eu sou Arthur Barbosa e transformo ideias em experiências web
            modernas.
          </motion.p>
        </div>
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Button size="lg">
            <Link href="/projects">Ver projetos</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/contact">Entrar em contato</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

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

export default function AboutPage() {
  const socials = [
    {
      username: "@arthurbarbosaa",
      href: "https://github.com/arthurbarbosaa",
      icon: "/assets/icons/github.svg",
    },
    {
      username: "Arthur Barbosa",
      href: "https://www.linkedin.com/in/arthur-barbosa-b0429a302/",
      icon: "/assets/icons/linkedin.svg",
    },
    {
      username: "@arthurbarbosaaa",
      href: "https://www.youtube.com/@arthurbarbosaaa",
      icon: "/assets/icons/youtube.svg",
    },
  ]

  return (
    <section className="flex min-h-svh items-center justify-center">
      <motion.div
        className="grid w-full max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 md:items-center md:gap-10 md:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* TEXT */}
        <motion.div
          className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:items-start md:text-left"
          variants={containerVariants}
        >
          <motion.h1
            className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
            variants={lineVariants}
          >
            About
          </motion.h1>

          <motion.p
            className="max-w-xl text-base text-muted-foreground sm:text-lg"
            variants={lineVariants}
          >
            I'm a software developer focused on building scalable and
            maintainable applications. I enjoy working with modern web
            technologies, exploring design patterns, and creating solutions that
            balance performance, clarity, and user experience.
          </motion.p>

          {/* SOCIAL BUTTONS */}
          <motion.div
            className="flex w-full flex-wrap justify-center gap-3 md:justify-start"
            variants={containerVariants}
          >
            {socials.map((item, index) => (
              <motion.div
                key={item.href}
                variants={buttonVariants}
                custom={index}
              >
                <Button variant="outline" className="w-full sm:w-auto">
                  <Link
                    href={item.href}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    {item.username}
                    <Image
                      src={item.icon}
                      alt={item.username}
                      width={16}
                      height={16}
                    />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* CV BUTTON */}
          <motion.div variants={buttonVariants} custom={4}>
            <Button>
              <Link
                href="https://drive.google.com/file/d/13Ed_2hw1s1etZZbvhfu5299qKof1bU2m/view?usp=sharing"
                target="_blank"
                className="flex items-center gap-2"
              >
                My Resume
                <ExternalLink className="h-4 w-4 opacity-70" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* IMAGE */}
        <motion.div variants={lineVariants} className="order-1 md:order-2">
          <Card className="mx-auto w-full max-w-md gap-0 overflow-hidden bg-transparent py-0 shadow-2xl ring-0 shadow-black/60">
            <div className="relative h-[500px] w-full md:h-[500px] lg:h-[600px]">
              <Image
                src="/assets/images/me.webp"
                alt="Profile"
                fill
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

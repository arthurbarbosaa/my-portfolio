"use client"

import { motion, useReducedMotion } from "motion/react"
import { usePathname } from "next/navigation"

type TemplateProps = {
  children: React.ReactNode
}

const PAGE_EASE = [0.22, 1, 0.36, 1] as const

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: PAGE_EASE }}
    >
      {children}
    </motion.div>
  )
}

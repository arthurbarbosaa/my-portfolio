"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export default function MeshGradientBackground() {
  return (
    <MeshGradient
      className="fixed inset-0 -z-10 h-full w-full"
      colors={["#000000", "#1c1c1c", "#4a4a4a", "#d4d4d4"]}
      speed={0.9}
    />
  )
}

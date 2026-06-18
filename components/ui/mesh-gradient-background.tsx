"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export default function MeshGradientBackground() {
  return (
    <MeshGradient
      className="fixed inset-0 w-full h-full -z-10"
      colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
      speed={0.6}
    />
  )
}

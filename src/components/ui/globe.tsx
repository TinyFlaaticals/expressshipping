"use client"

import createGlobe, { COBEOptions, Marker } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Location {
  coordinates: [number, number] // Explicitly type as tuple
  size: number
}

const LOCATIONS: Location[] = [
  { coordinates: [4.1755, 73.5093], size: 0.1 },     // Male, Maldives
  { coordinates: [1.3521, 103.8198], size: 0.08 },   // Singapore
  { coordinates: [22.3193, 114.1694], size: 0.08 },  // Hong Kong
  { coordinates: [25.2048, 55.2708], size: 0.08 },   // Dubai
  { coordinates: [31.2304, 121.4737], size: 0.08 },  // Shanghai
  { coordinates: [35.6762, 139.6503], size: 0.08 },  // Tokyo
  { coordinates: [51.5074, -0.1278], size: 0.08 },   // London
  { coordinates: [40.7128, -74.0060], size: 0.08 },  // New York
  { coordinates: [-33.8688, 151.2093], size: 0.08 }, // Sydney
  { coordinates: [13.0827, 80.2707], size: 0.08 },   // Chennai
  { coordinates: [6.9271, 79.8612], size: 0.08 },    // Colombo
  { coordinates: [29.9511, 122.3667], size: 0.08 },  // Ningbo
  { coordinates: [3.1390, 101.6869], size: 0.08 },   // Kuala Lumpur
  { coordinates: [52.3676, 4.9041], size: 0.08 },    // Rotterdam
] as const

const GLOBE_CONFIG: COBEOptions = {
  width: 1200,
  height: 1200,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.6,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.9, 0.9, 0.9],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: LOCATIONS.map((loc): Marker => ({
    location: loc.coordinates,
    size: loc.size
  })),
  onRender: (state: Record<string, any>) => {
    if ('phi' in state) {
      state.phi += 0.005
    }
  },
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 400) // Reduced from 200 to 400 for slower manual rotation
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.002 // Reduced from 0.005 to 0.002
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })

    return () => {
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [])

  return (
    <div className={cn(
      "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[1200px] cursor-grab",
      className,
    )}>
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] cursor-grab"
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}

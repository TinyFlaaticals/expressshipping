import { Globe } from '@/components/ui/globe'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f9fa]">
      <Globe />
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold mb-4">
          THE MALDIVES' LOGISTICS EXPERTS
        </h1>
        <p className="text-2xl">
          Reliable Logistics, Beyond Boundaries
        </p>
      </div>
    </div>
  )
} 
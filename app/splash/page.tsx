// app/splash/page.tsx
"use client"

import { useEffect } from "react"
import { Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate checking auth state and loading
    const timer = setTimeout(() => {
      // For prototype, always redirect to welcome
      // In production, check auth state and redirect accordingly
      router.push("/welcome")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary/90 via-primary to-primary/80 items-center justify-center">
      {/* Logo */}
      <div className="mb-8 animate-in fade-in zoom-in duration-500">
        <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Briefcase className="w-16 h-16 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-5xl font-bold text-white mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        SVYPE
      </h1>
      <p className="text-white/80 text-lg mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        AI-Powered Job Hunting
      </p>

      {/* Loading Indicator */}
      <div className="animate-in fade-in duration-700 delay-500">
        <Spinner className="text-white" />
      </div>
    </div>
  )
}

// app/page.tsx
"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Zap, Building2, User, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserType {
  id: string
  type: "job-seeker" | "company"
  icon: typeof User
  title: string
  description: string
  signUpPath: string
  loginPath: string
}

export default function Home() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const userTypes: UserType[] = [
    {
      id: "job-seeker",
      type: "job-seeker",
      icon: User,
      title: "I'm Looking for a Job",
      description: "Swipe through opportunities, get AI career coaching, and land your dream role",
      signUpPath: "/auth/sign-up",
      loginPath: "/auth/login",
    },
    {
      id: "company",
      type: "company",
      icon: Building2,
      title: "I'm Hiring Talent",
      description: "Post jobs, review applicants with swipe interface, and build your team",
      signUpPath: "/auth/company-sign-up",
      loginPath: "/auth/company-login",
    },
  ]

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setDragOffset({
      x: e.touches[0].clientX - startPos.x,
      y: e.touches[0].clientY - startPos.y,
    })
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 100

    if (dragOffset.x > threshold) {
      // Swipe right - go to login
      router.push(userTypes[currentIndex].loginPath)
    } else if (dragOffset.x < -threshold) {
      // Swipe left - next card
      setCurrentIndex((currentIndex + 1) % userTypes.length)
    }

    setDragOffset({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setDragOffset({ x: e.clientX - startPos.x, y: e.clientY - startPos.y })
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 100

    if (dragOffset.x > threshold) {
      // Swipe right - go to login
      router.push(userTypes[currentIndex].loginPath)
    } else if (dragOffset.x < -threshold) {
      // Swipe left - next card
      setCurrentIndex((currentIndex + 1) % userTypes.length)
    }

    setDragOffset({ x: 0, y: 0 })
  }

  const currentUserType = userTypes[currentIndex]
  const IconComponent = currentUserType.icon

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl w-full text-center space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center text-primary-foreground shadow-xl">
              <Briefcase size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance">SVYPE</h1>
          <p className="text-muted-foreground text-base text-pretty max-w-2xl mx-auto">
            AI-powered job hunting platform. Swipe your way to your dream career.
          </p>
        </div>

        {/* Card Type Indicator */}
        <div className="flex justify-center gap-2">
          {userTypes.map((type, index) => (
            <button
              key={type.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Swipeable Card */}
        <div className="flex items-center justify-center relative">
          <div
            ref={cardRef}
            className="relative w-full max-w-md touch-none"
            style={{
              transform: `translateX(${dragOffset.x}px) rotate(${dragOffset.x * 0.05}deg)`,
              transition: isDragging ? "none" : "transform 0.3s ease-out",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Swipe Right Overlay */}
            {dragOffset.x > 50 && (
              <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-green-500 text-white p-4 rounded-full shadow-lg transform rotate-12">
                  <ArrowRight className="w-12 h-12" strokeWidth={3} />
                </div>
              </div>
            )}

            {/* Swipe Left Overlay */}
            {dragOffset.x < -50 && (
              <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-blue-500 text-white p-4 rounded-full shadow-lg transform -rotate-12">
                  <ChevronLeft className="w-12 h-12" strokeWidth={3} />
                </div>
              </div>
            )}

            <Card className="border-2 shadow-2xl">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{currentUserType.title}</h2>
                <p className="text-muted-foreground">{currentUserType.description}</p>
                <div className="space-y-2 pt-2">
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={() => router.push(currentUserType.signUpPath)}
                  >
                    Get Started <ArrowRight size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => router.push(currentUserType.loginPath)}
                  >
                    Log In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Swipe right to login • Swipe left to switch
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/70">
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + userTypes.length) % userTypes.length)}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % userTypes.length)}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

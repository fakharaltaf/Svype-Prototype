"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Check, ArrowLeft, Star, MapPin, Briefcase, FileText, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Applicant {
  id: string
  name: string
  email: string
  location: string
  experience: string
  skills: string[]
  bio: string
  avatar?: string
  appliedFor: string
  appliedAt: string
}

export default function ReviewApplicantsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [showDetails, setShowDetails] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const [applicants] = useState<Applicant[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      location: "London, UK",
      experience: "5 years",
      skills: ["React", "TypeScript", "Next.js", "Node.js", "UI/UX"],
      bio: "Passionate frontend engineer with a strong focus on creating intuitive user experiences. Previously worked at top tech companies building scalable web applications.",
      appliedFor: "Senior Frontend Engineer",
      appliedAt: "2 hours ago",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@email.com",
      location: "Manchester, UK",
      experience: "3 years",
      skills: ["Figma", "UI Design", "Prototyping", "Design Systems"],
      bio: "Creative product designer with expertise in user-centered design. Love transforming complex problems into simple, beautiful interfaces.",
      appliedFor: "Product Designer",
      appliedAt: "5 hours ago",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      location: "Remote",
      experience: "4 years",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "REST APIs"],
      bio: "Backend developer specializing in scalable microservices and cloud infrastructure. Strong focus on performance and reliability.",
      appliedFor: "Backend Developer",
      appliedAt: "1 day ago",
    },
  ])

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

    if (dragOffset.x < -threshold) {
      handleReject()
    } else if (dragOffset.x > threshold) {
      handleApprove()
    } else if (dragOffset.y < -threshold) {
      setShowDetails(true)
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

    if (dragOffset.x < -threshold) {
      handleReject()
    } else if (dragOffset.x > threshold) {
      handleApprove()
    } else if (dragOffset.y < -threshold) {
      setShowDetails(true)
    }

    setDragOffset({ x: 0, y: 0 })
  }

  const handleApprove = () => {
    const applicant = applicants[currentIndex]
    toast({
      title: "Applicant Approved!",
      description: `${applicant.name} has been moved to the next stage.`,
    })
    setCurrentIndex(currentIndex + 1)
    setShowDetails(false)
  }

  const handleReject = () => {
    const applicant = applicants[currentIndex]
    toast({
      title: "Applicant Rejected",
      description: `${applicant.name} has been removed from consideration.`,
      variant: "destructive",
    })
    setCurrentIndex(currentIndex + 1)
    setShowDetails(false)
  }

  if (currentIndex >= applicants.length) {
    return (
      <div className="flex flex-col h-screen bg-background items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">All Caught Up!</h2>
          <p className="text-muted-foreground mb-6">
            You've reviewed all pending applicants. Check back later for new applications.
          </p>
          <Button onClick={() => router.push("/company/dashboard")}>Back to Dashboard</Button>
        </Card>
      </div>
    )
  }

  const currentApplicant = applicants[currentIndex]

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Review Applicants</h1>
            <p className="text-sm text-muted-foreground">{applicants.length - currentIndex} remaining</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-start justify-center p-4 relative">
        <div
          ref={cardRef}
          className="relative w-full max-w-md h-[75vh] touch-none mx-auto"
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
            cursor: isDragging ? "grabbing" : "grab",
            opacity: Math.max(0.5, 1 - Math.abs(dragOffset.x) / 300),
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Swipe Overlays */}
          {dragOffset.x > 50 && (
            <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-green-500 text-white p-4 rounded-full shadow-lg transform rotate-12">
                <Check className="w-12 h-12" strokeWidth={3} />
              </div>
            </div>
          )}
          {dragOffset.x < -50 && (
            <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-red-500 text-white p-4 rounded-full shadow-lg transform -rotate-12">
                <X className="w-12 h-12" strokeWidth={3} />
              </div>
            </div>
          )}

          <Card className="w-full h-full overflow-hidden shadow-2xl bg-card/95 backdrop-blur-sm">
            <div className="h-full flex flex-col p-6 relative overflow-y-auto">
              {/* Profile Header */}
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                  <AvatarImage src={currentApplicant.avatar} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                    {currentApplicant.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-center">{currentApplicant.name}</h2>
                <p className="text-muted-foreground">{currentApplicant.email}</p>
              </div>

              {/* Applied For */}
              <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Applied for</p>
                <p className="font-semibold">{currentApplicant.appliedFor}</p>
                <p className="text-xs text-muted-foreground mt-1">{currentApplicant.appliedAt}</p>
              </div>

              {/* Info Grid */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{currentApplicant.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-5 h-5" />
                  <span>{currentApplicant.experience} experience</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentApplicant.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 mb-6">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{currentApplicant.bio}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 min-w-0 border-red-200 hover:bg-red-50 hover:border-red-300"
                  size="lg"
                  onClick={handleReject}
                >
                  <X className="w-5 h-5 flex-shrink-0" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 min-w-0"
                  size="lg"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                </Button>
                <Button
                  className="flex-1 min-w-0 bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={handleApprove}
                >
                  <Check className="w-5 h-5 flex-shrink-0" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Swipe Hints */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-muted-foreground/50 text-sm">
          <p>← Reject • Resume • Approve →</p>
        </div>
      </div>
    </div>
  )
}

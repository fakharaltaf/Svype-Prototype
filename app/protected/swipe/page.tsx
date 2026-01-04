// app/protected/swipe/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X, Check, MapPin, Calendar, Briefcase, DollarSign, ChevronUp, ChevronDown, Undo2, Sparkles, TrendingUp } from "lucide-react"
import { getAvailableJobs, applyToJob, discardJob, Job, initializeMockData, undoDiscard, resetMockData } from "@/lib/mock-data"
import { TutorialOverlay, SWIPE_TUTORIAL } from "@/components/tutorial-overlay"
import { EmptyState } from "@/components/empty-state"
import { JobCardSkeleton } from "@/components/loading-skeletons"

export default function SwipePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [showDetails, setShowDetails] = useState(false)
  const [lastDiscarded, setLastDiscarded] = useState<Job | null>(null)
  const [showUndo, setShowUndo] = useState(false)
  const [showAppliedDialog, setShowAppliedDialog] = useState(false)
  const [appliedJob, setAppliedJob] = useState<Job | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    initializeMockData()
    loadJobs()
  }, [])

  const loadJobs = () => {
    const availableJobs = getAvailableJobs()
    setJobs(availableJobs)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY

    setDragOffset({
      x: currentX - startPos.x,
      y: currentY - startPos.y,
    })
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100

    // Swipe left - discard
    if (dragOffset.x < -threshold) {
      handleDiscard()
      setDragOffset({ x: 0, y: 0 })
      return
    }

    // Swipe right - apply
    if (dragOffset.x > threshold) {
      handleApply()
      setDragOffset({ x: 0, y: 0 })
      return
    }

    // Swipe up - show details
    if (dragOffset.y < -threshold) {
      setShowDetails(true)
    }

    setDragOffset({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartPos({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    setDragOffset({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    })
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100

    // Swipe left - discard
    if (dragOffset.x < -threshold) {
      handleDiscard()
      setDragOffset({ x: 0, y: 0 })
      return
    }

    // Swipe right - apply
    if (dragOffset.x > threshold) {
      handleApply()
      setDragOffset({ x: 0, y: 0 })
      return
    }

    // Swipe up - show details
    if (dragOffset.y < -threshold) {
      setShowDetails(true)
    }

    setDragOffset({ x: 0, y: 0 })
  }

  const handleApply = () => {
    const currentJob = jobs[currentIndex]
    if (currentJob) {
      applyToJob(currentJob)
      setJobs(jobs.filter((_, index) => index !== currentIndex))
      setAppliedJob(currentJob)
      setShowAppliedDialog(true)
    }
    setShowDetails(false)
  }

  const handleDiscard = () => {
    const currentJob = jobs[currentIndex]
    if (currentJob) {
      discardJob(currentJob.id)
      setJobs(jobs.filter((_, index) => index !== currentIndex))
      setLastDiscarded(currentJob)
      setShowUndo(true)
      
      // Clear any existing timer
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current)
      }
      
      // Hide undo button after 5 seconds
      undoTimerRef.current = setTimeout(() => {
        setShowUndo(false)
        setLastDiscarded(null)
      }, 5000)
    }
    setShowDetails(false)
  }

  const handleUndo = () => {
    if (lastDiscarded) {
      undoDiscard(lastDiscarded.id)
      setJobs([lastDiscarded, ...jobs])
      setLastDiscarded(null)
      setShowUndo(false)
      
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current)
      }
    }
  }

  const handleReset = () => {
    resetMockData()
    loadJobs()
    setCurrentIndex(0)
    setLastDiscarded(null)
    setShowUndo(false)
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current)
    }
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current)
      }
    }
  }, [])

  const formatSalary = (min: number, max: number) => {
    return `£${(min / 1000).toFixed(0)}k - £${(max / 1000).toFixed(0)}k`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 14) return "1 week ago"
    return `${Math.floor(diffDays / 7)} weeks ago`
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/20 items-center justify-center p-4">
        <EmptyState 
          type="no-jobs" 
          onAction={handleReset}
        />
      </div>
    )
  }

  const currentJob = jobs[currentIndex]

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <TutorialOverlay tutorialKey="swipe" steps={SWIPE_TUTORIAL} />
      
      {/* Job Counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium shadow-lg">
          {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} remaining
        </Badge>
      </div>
      {/* Main Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
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
          {dragOffset.y < -50 && dragOffset.x > -50 && dragOffset.x < 50 && (
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
                <ChevronUp className="w-12 h-12" strokeWidth={3} />
              </div>
            </div>
          )}

          <Card className="w-full h-full overflow-hidden shadow-2xl bg-card/95 backdrop-blur-sm">
            {/* Card Content */}
            <div className="h-full flex flex-col p-6 relative overflow-y-auto">
              {/* Swipe Indicator */}
              <div className="absolute top-4 right-4 text-muted-foreground/50 text-xs">
                ↑ Details
              </div>

              {/* Company & Title */}
              <div className="mb-4">
                <h2 className="text-3xl font-bold mb-2">{currentJob.title}</h2>
                <p className="text-xl text-muted-foreground font-medium">{currentJob.company}</p>
              </div>

              {/* Key Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{currentJob.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-5 h-5" />
                  <span>{currentJob.type}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-5 h-5" />
                  <span>{formatSalary(currentJob.salary_min, currentJob.salary_max)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {formatDate(currentJob.posted_at)}</span>
                </div>
              </div>

              {/* Description Preview */}
              <div className="flex-1 mb-6">
                <h3 className="font-semibold mb-2 text-lg">About the role</h3>
                <p className="text-muted-foreground line-clamp-6">{currentJob.description}</p>
              </div>

              {/* Requirements Preview */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-lg">Key Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.requirements.slice(0, 4).map((req, index) => (
                    <Badge key={index} variant="outline">
                      {req}
                    </Badge>
                  ))}
                  {currentJob.requirements.length > 4 && (
                    <Badge variant="outline">+{currentJob.requirements.length - 4} more</Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 min-w-0 border-red-200 hover:bg-red-50 hover:border-red-300"
                  size="lg"
                  onClick={handleDiscard}
                >
                  <X className="w-5 h-5 flex-shrink-0" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 min-w-0"
                  size="lg"
                  onClick={() => setShowDetails(true)}
                >
                  <ChevronUp className="w-5 h-5 flex-shrink-0" />
                </Button>
                <Button
                  className="flex-1 min-w-0 bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={handleApply}
                >
                  <Check className="w-5 h-5 flex-shrink-0" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Swipe Hints */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-muted-foreground/50 text-sm">
          <p>← Pass • ↑ Details • Apply →</p>
        </div>
      </div>

      {/* Undo Button */}
      {showUndo && lastDiscarded && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-primary/90 to-primary backdrop-blur-lg rounded-full shadow-lg border border-primary-foreground/10">
            <Button
              onClick={handleUndo}
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground rounded-full px-4 py-2 h-auto"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Undo2 className="w-3 h-3" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] opacity-90">Undo pass</span>
                  <span className="font-semibold text-xs">{lastDiscarded.company}</span>
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Job Details Panel - Slides from bottom */}
      {showDetails && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDetails(false)}
        />
      )}
      <div
        className="fixed bottom-0 left-0 right-0 z-[60] bg-background rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out flex flex-col"
        style={{
          transform: showDetails ? 'translateY(0)' : 'translateY(100%)',
          height: '85vh',
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-3 border-b flex-shrink-0">
          <button
            onClick={() => setShowDetails(false)}
            className="w-12 h-1.5 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50 transition-colors"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-3xl font-bold flex-1">{currentJob.title}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
            <p className="text-xl text-muted-foreground font-medium">{currentJob.company}</p>
          </div>

          <div className="space-y-6 pb-6">
            {/* Job Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{currentJob.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-5 h-5" />
                <span>{currentJob.type}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-5 h-5" />
                <span>{formatSalary(currentJob.salary_min, currentJob.salary_max)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <span>Posted {formatDate(currentJob.posted_at)}</span>
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">About the Role</h3>
              <p className="text-muted-foreground">{currentJob.description}</p>
            </div>

            {/* Full Requirements */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">Requirements</h3>
              <ul className="space-y-2">
                {currentJob.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button size="lg" onClick={handleApply} className="w-full bg-green-600 hover:bg-green-700">
                <Check className="w-5 h-5 mr-2" />
                Apply Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDiscard}
                className="w-full border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                <X className="w-5 h-5 mr-2" />
                Pass on this job
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Applied Success Dialog */}
      <Dialog open={showAppliedDialog} onOpenChange={setShowAppliedDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Application Sent! 🎉</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your application has been successfully submitted to
            </DialogDescription>
          </DialogHeader>
          
          {appliedJob && (
            <div className="space-y-4 py-4">
              {/* Job Info Card */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{appliedJob.title}</h3>
                    <p className="text-muted-foreground">{appliedJob.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{appliedJob.location}</span>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">We&apos;ll notify you</p>
                    <p className="text-xs text-muted-foreground">When the employer views your application</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Keep swiping</p>
                    <p className="text-xs text-muted-foreground">More opportunities are waiting for you</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAppliedDialog(false)}
                >
                  Continue Swiping
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowAppliedDialog(false)
                    window.location.href = '/protected/dashboard'
                  }}
                >
                  View Applications
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

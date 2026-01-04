// components/tutorial-overlay.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ChevronRight, ChevronLeft } from "lucide-react"

interface TutorialStep {
  title: string
  description: string
  position: React.CSSProperties
  highlightElement?: string
}

interface TutorialOverlayProps {
  tutorialKey: string
  steps: TutorialStep[]
  onComplete?: () => void
}

export function TutorialOverlay({ tutorialKey, steps, onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already seen this tutorial
    const hasSeenTutorial = localStorage.getItem(`tutorial-${tutorialKey}`)
    if (!hasSeenTutorial) {
      setIsVisible(true)
    }
  }, [tutorialKey])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem(`tutorial-${tutorialKey}`, "true")
    setIsVisible(false)
    onComplete?.()
  }

  const handleSkip = () => {
    localStorage.setItem(`tutorial-${tutorialKey}`, "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  const step = steps[currentStep]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in" />

      {/* Tutorial Card */}
      <Card
        className="fixed z-[101] p-6 max-w-md animate-in slide-in-from-bottom-4"
        style={step.position}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentStep
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" size="sm" onClick={handlePrevious}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              <Button size="sm" onClick={handleNext}>
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  "Got it!"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

// Predefined tutorials
export const SWIPE_TUTORIAL: TutorialStep[] = [
  {
    title: "Welcome to SVYPE!",
    description: "Swipe right on jobs you like, left to pass. Let's show you around!",
    position: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  },
  {
    title: "Swipe Right to Like",
    description: "When you see a job you're interested in, swipe right or tap the heart button to save it.",
    position: { bottom: "120px", left: "50%", transform: "translateX(-50%)" }
  },
  {
    title: "Swipe Left to Pass",
    description: "Not interested? Swipe left or tap the X button to move to the next job.",
    position: { bottom: "120px", left: "50%", transform: "translateX(-50%)" }
  },
  {
    title: "Tap for Details",
    description: "Tap on a card to see the full job description and company information.",
    position: { top: "200px", left: "50%", transform: "translateX(-50%)" }
  }
]

export const DASHBOARD_TUTORIAL: TutorialStep[] = [
  {
    title: "Your Dashboard",
    description: "Here's your overview of applications, saved jobs, and recent activity.",
    position: { top: "100px", left: "50%", transform: "translateX(-50%)" }
  },
  {
    title: "Quick Actions",
    description: "Use these shortcuts to generate your CV, create cover letters, or view saved jobs.",
    position: { top: "200px", right: "20px" }
  },
  {
    title: "Application Stats",
    description: "Track your application progress and response rates here.",
    position: { top: "300px", left: "20px" }
  }
]

export const PROFILE_TUTORIAL: TutorialStep[] = [
  {
    title: "Complete Your Profile",
    description: "A complete profile helps match you with better job opportunities.",
    position: { top: "100px", left: "50%", transform: "translateX(-50%)" }
  },
  {
    title: "Skills & Experience",
    description: "Add your skills and work experience to improve your match score.",
    position: { top: "250px", left: "20px" }
  },
  {
    title: "Preferences",
    description: "Set your job preferences to see more relevant opportunities.",
    position: { bottom: "150px", left: "20px" }
  }
]

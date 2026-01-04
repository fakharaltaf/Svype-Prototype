// components/empty-state.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Briefcase, 
  Heart, 
  FileText, 
  Search, 
  Plus,
  Sparkles,
  ArrowRight
} from "lucide-react"

interface EmptyStateProps {
  type: "no-jobs" | "no-applications" | "no-saved" | "no-matches" | "no-cv"
  onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const states = {
    "no-jobs": {
      icon: Briefcase,
      title: "No jobs yet",
      description: "We're still loading opportunities for you. This won't take long!",
      action: "Refresh",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full opacity-50 animate-pulse" />
          <Briefcase className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-muted-foreground/40" />
        </div>
      )
    },
    "no-applications": {
      icon: FileText,
      title: "No applications yet",
      description: "Start swiping on jobs to submit your first application!",
      action: "Start Swiping",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full opacity-50" />
          <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-muted-foreground/40" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-ping" />
        </div>
      )
    },
    "no-saved": {
      icon: Heart,
      title: "No saved jobs",
      description: "Jobs you like will appear here. Start swiping to find your perfect match!",
      action: "Browse Jobs",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20 rounded-full opacity-50" />
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-muted-foreground/40" />
        </div>
      )
    },
    "no-matches": {
      icon: Search,
      title: "No matches found",
      description: "Try adjusting your filters or preferences to see more opportunities.",
      action: "Update Filters",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full opacity-50" />
          <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-muted-foreground/40" />
        </div>
      )
    },
    "no-cv": {
      icon: Sparkles,
      title: "Create your first CV",
      description: "Generate a professional CV tailored to your dream job with AI assistance.",
      action: "Generate CV",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full opacity-50 animate-pulse" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-muted-foreground/40" />
          <Plus className="absolute top-8 right-8 w-8 h-8 text-purple-500" />
        </div>
      )
    }
  }

  const state = states[type]
  const Icon = state.icon

  return (
    <Card className="p-12 text-center">
      <div className="max-w-md mx-auto space-y-6">
        {state.illustration}

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-xl font-semibold">{state.title}</h3>
          </div>
          <p className="text-muted-foreground">{state.description}</p>
        </div>

        {onAction && (
          <Button onClick={onAction} size="lg" className="gap-2">
            {state.action}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}

// List empty state for smaller contexts
export function ListEmptyState({ 
  title, 
  description, 
  icon: Icon = Briefcase 
}: { 
  title: string
  description: string
  icon?: React.ElementType 
}) {
  return (
    <div className="py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

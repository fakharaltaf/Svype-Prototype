// app/protected/saved/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Briefcase, DollarSign, MapPin, Trash2, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { getAvailableJobs, type Job } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { EmptyState } from "@/components/empty-state"
import { JobListItemSkeleton } from "@/components/loading-skeletons"

export default function SavedJobsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [savedJobs, setSavedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [swipedItem, setSwipedItem] = useState<string | null>(null)

  useEffect(() => {
    loadSavedJobs()
  }, [])

  const loadSavedJobs = () => {
    const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]') as string[]
    const allJobs = getAvailableJobs()
    const saved = allJobs.filter(job => savedIds.includes(job.id))
    setSavedJobs(saved)
    setLoading(false)
  }

  const handleRemove = (jobId: string) => {
    const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]') as string[]
    const filtered = savedIds.filter(id => id !== jobId)
    localStorage.setItem('savedJobs', JSON.stringify(filtered))
    loadSavedJobs()
    toast({ description: "Job removed from saved" })
  }

  const formatSalary = (min: number, max: number) => {
    return `£${(min / 1000).toFixed(0)}k - £${(max / 1000).toFixed(0)}k`
  }

  const JobCard = ({ job }: { job: Job }) => {
    const swipeHandlers = useSwipeable({
      onSwipedLeft: () => setSwipedItem(job.id),
      onSwipedRight: () => setSwipedItem(null),
      trackMouse: true,
      preventScrollOnSwipe: true,
    })

    return (
      <div className="relative">
        {/* Delete button revealed on swipe */}
        {swipedItem === job.id && (
          <div className="absolute inset-0 bg-destructive flex items-center justify-end pr-6 rounded-lg">
            <Trash2 className="w-6 h-6 text-destructive-foreground" />
          </div>
        )}
        
        <div
          {...swipeHandlers}
          className={`transition-transform duration-200 ${swipedItem === job.id ? '-translate-x-20' : ''}`}
        >
          <Card 
            className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer"
            onClick={() => router.push(`/protected/job/${job.id}`)}
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex justify-between items-start mb-3 gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg mb-1 truncate">{job.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium truncate">{job.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(job.id)
                  }}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                <Badge variant="outline" className="gap-1 text-xs">
                  <Briefcase className="w-3 h-3" />
                  {job.type}
                </Badge>
                <Badge variant="outline" className="gap-1 text-xs">
                  <DollarSign className="w-3 h-3" />
                  <span className="hidden sm:inline">{formatSalary(job.salary_min, job.salary_max)}</span>
                  <span className="sm:hidden">£{(job.salary_min / 1000).toFixed(0)}k+</span>
                </Badge>
                <Badge variant="outline" className="gap-1 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate max-w-[120px]">{job.location}</span>
                </Badge>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/protected/job/${job.id}`)
                }}
              >
                View Details <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Bookmark className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold">Saved Jobs</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">{savedJobs.length} jobs saved</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 sm:hidden">← Swipe left to delete</p>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 py-4 space-y-3 sm:space-y-4">
        {loading ? (
          <>
            <JobListItemSkeleton />
            <JobListItemSkeleton />
            <JobListItemSkeleton />
          </>
        ) : savedJobs.length > 0 ? (
          savedJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <EmptyState 
            type="no-saved" 
            onAction={() => router.push('/protected/swipe')} 
          />
        )}
      </div>
    </div>
  )
}

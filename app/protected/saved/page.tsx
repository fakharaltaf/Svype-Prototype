"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Briefcase, DollarSign, MapPin, Trash2, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { getAvailableJobs, type Job } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function SavedJobsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [savedJobs, setSavedJobs] = useState<Job[]>([])

  useEffect(() => {
    loadSavedJobs()
  }, [])

  const loadSavedJobs = () => {
    const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]') as string[]
    const allJobs = getAvailableJobs()
    const saved = allJobs.filter(job => savedIds.includes(job.id))
    setSavedJobs(saved)
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Saved Jobs</h1>
            <p className="text-sm text-muted-foreground">{savedJobs.length} jobs saved</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <Card 
              key={job.id} 
              className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer"
              onClick={() => router.push(`/protected/job/${job.id}`)}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                    <p className="text-muted-foreground font-medium">{job.company}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(job.id)
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="gap-1">
                    <Briefcase className="w-3 h-3" />
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <DollarSign className="w-3 h-3" />
                    {formatSalary(job.salary_min, job.salary_max)}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </Badge>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/protected/job/${job.id}`)
                  }}
                >
                  View Details <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Saved Jobs Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start bookmarking jobs you're interested in to review them later
            </p>
            <Button onClick={() => router.push('/protected/swipe')}>
              Browse Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

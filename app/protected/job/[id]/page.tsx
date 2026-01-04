// app/protected/job/[id]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, MapPin, Briefcase, DollarSign, Clock, Building2, CheckCircle2, Bookmark, Share2, ExternalLink } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { getAvailableJobs, applyToJob, type Job } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function JobDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [job, setJob] = useState<Job | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    const jobId = params.id as string
    const jobs = getAvailableJobs()
    const foundJob = jobs.find(j => j.id === jobId)
    if (foundJob) {
      setJob(foundJob)
    }

    // Check if saved
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]') as string[]
    setIsSaved(saved.includes(jobId))

    // Check if already applied
    const applications = JSON.parse(localStorage.getItem('applications') || '[]')
    setHasApplied(applications.some((app: any) => app.job.id === jobId))
  }, [params.id])

  const handleApply = () => {
    if (!job) return
    applyToJob(job)
    setHasApplied(true)
    toast({
      title: "Application Submitted! 🎉",
      description: `Your application for ${job.title} has been sent.`,
    })
  }

  const handleSave = () => {
    if (!job) return
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]') as string[]
    
    if (isSaved) {
      const filtered = saved.filter(id => id !== job.id)
      localStorage.setItem('savedJobs', JSON.stringify(filtered))
      setIsSaved(false)
      toast({ description: "Job removed from saved" })
    } else {
      saved.push(job.id)
      localStorage.setItem('savedJobs', JSON.stringify(saved))
      setIsSaved(true)
      toast({ description: "Job saved for later" })
    }
  }

  const handleShare = () => {
    if (navigator.share && job) {
      navigator.share({
        title: job.title,
        text: `Check out this ${job.title} position at ${job.company}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({ description: "Link copied to clipboard" })
    }
  }

  const formatSalary = (min: number, max: number) => {
    return `£${(min / 1000).toFixed(0)}k - £${(max / 1000).toFixed(0)}k`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  if (!job) {
    return (
      <div className="flex flex-col h-screen bg-background items-center justify-center">
        <p className="text-muted-foreground">Job not found</p>
        <Button variant="ghost" onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSave}
              className={isSaved ? "text-primary" : ""}
            >
              <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-4 max-w-4xl mx-auto w-full">
        {/* Company Header */}
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xl">
                  {job.company.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">{job.title}</h1>
                <p className="text-base sm:text-lg text-muted-foreground font-medium mb-3 truncate">{job.company}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge variant="outline" className="gap-1 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[100px] sm:max-w-full">{job.location}</span>
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Briefcase className="w-3 h-3" />
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <DollarSign className="w-3 h-3" />
                    {formatSalary(job.salary_min, job.salary_max)}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="w-3 h-3" />
                    Posted {formatDate(job.posted_at)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About the Role */}
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-bold">About the Role</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{job.description}</p>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-bold">Requirements</h2>
            <ul className="space-y-2 sm:space-y-3">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-bold">About {job.company}</h2>
              <Button variant="ghost" size="sm" onClick={() => router.push(`/protected/company/${job.company.toLowerCase().replace(/\s+/g, '-')}`)} className="self-start sm:self-auto text-xs sm:text-sm">
                View Profile <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground mb-2">
                  {job.company} is a leading company in the technology sector, known for innovation and employee satisfaction.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">100-500 employees</Badge>
                  <Badge variant="secondary">Tech Industry</Badge>
                  <Badge variant="secondary">Founded 2015</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Similar Jobs */}
        <Card className="border-2">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Similar Opportunities</h2>
            <div className="space-y-2">
              {getAvailableJobs().filter(j => j.id !== job.id).slice(0, 3).map((similarJob) => (
                <div 
                  key={similarJob.id}
                  className="p-3 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/protected/job/${similarJob.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{similarJob.title}</p>
                      <p className="text-sm text-muted-foreground">{similarJob.company}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatSalary(similarJob.salary_min, similarJob.salary_max)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t">
        <div className="max-w-4xl mx-auto flex gap-3">
          {hasApplied ? (
            <Button size="lg" className="flex-1" disabled>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Applied
            </Button>
          ) : (
            <Button size="lg" className="flex-1" onClick={handleApply}>
              Apply Now
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={handleSave}>
            <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>
    </div>
  )
}

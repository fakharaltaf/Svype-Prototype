"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronLeft, MapPin, Briefcase, DollarSign, Calendar, Clock, 
  FileText, MessageSquare, CheckCircle2, TrendingUp, ExternalLink 
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { getApplications, type Application } from "@/lib/mock-data"

export default function ApplicationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [application, setApplication] = useState<Application | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const appId = params.id as string
    const apps = getApplications()
    const found = apps.find(app => app.id === appId)
    if (found) {
      setApplication(found)
    }
  }, [params.id])

  if (!application) {
    return (
      <div className="flex flex-col h-screen bg-background items-center justify-center">
        <p className="text-muted-foreground">Application not found</p>
        <Button variant="ghost" onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const { job, applicationStatus, applied_at } = application

  const formatSalary = (min: number, max: number) => {
    return `£${(min / 1000).toFixed(0)}k - £${(max / 1000).toFixed(0)}k`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "SHORTLISTED":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "INTERVIEW":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "REJECTED":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const timeline = [
    { status: "APPLIED", date: applied_at, description: "Application submitted" },
    ...(applicationStatus === "SHORTLISTED" || applicationStatus === "INTERVIEW" 
      ? [{ status: "SHORTLISTED", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: "Shortlisted for review" }] 
      : []),
    ...(applicationStatus === "INTERVIEW" 
      ? [{ status: "INTERVIEW", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: "Interview scheduled" }] 
      : []),
    ...(applicationStatus === "REJECTED" 
      ? [{ status: "REJECTED", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: "Application not selected" }] 
      : [])
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Application Details</h1>
            <p className="text-sm text-muted-foreground">Track your progress</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 max-w-4xl mx-auto w-full">
        {/* Job Card */}
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-16 h-16 border-2">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xl">
                  {job.company.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
                <p className="text-lg text-muted-foreground font-medium">{job.company}</p>
              </div>
              <Badge className={`${getStatusColor(applicationStatus)} font-medium`}>
                {applicationStatus}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Briefcase className="w-3 h-3" />
                {job.type}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <DollarSign className="w-3 h-3" />
                {formatSalary(job.salary_min, job.salary_max)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Application Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Applied On</span>
                    <span className="font-medium">{formatDate(applied_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={getStatusColor(applicationStatus)}>
                      {applicationStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Application ID</span>
                    <span className="font-mono text-sm">{application.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Job Description</h3>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <Card className="border-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-6">Application Timeline</h3>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                          {item.status === "APPLIED" && <FileText className="w-5 h-5" />}
                          {item.status === "SHORTLISTED" && <TrendingUp className="w-5 h-5" />}
                          {item.status === "INTERVIEW" && <Calendar className="w-5 h-5" />}
                          {item.status === "REJECTED" && <span className="text-lg">✕</span>}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-12 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h4 className="font-semibold mb-1">{item.description}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {applicationStatus === "INTERVIEW" && (
              <Card className="border-2 border-amber-200 dark:border-amber-900/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Upcoming Interview</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Scheduled for January 5, 2026 at 2:00 PM
                      </p>
                      <Button size="sm">
                        View Interview Details <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-4">
            <Card className="border-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Application Notes</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Initial Submission</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted application with updated CV highlighting React and TypeScript experience
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(applied_at)}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => router.push(`/protected/job/${job.id}`)}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Job
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

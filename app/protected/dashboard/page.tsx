// app/protected/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Calendar, CheckCircle2, Clock, MapPin, DollarSign, TrendingUp, Sparkles, FileText, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { initializeMockData, getApplications, type Application } from "@/lib/mock-data"
import { EmptyState } from "@/components/empty-state"
import { DashboardStatsSkeleton, JobListItemSkeleton } from "@/components/loading-skeletons"
import { TutorialOverlay, DASHBOARD_TUTORIAL } from "@/components/tutorial-overlay"

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  useEffect(() => {
    initializeMockData()
    loadApplications()
  }, [])

  const loadApplications = () => {
    const apps = getApplications()
    setApplications(apps)
    setLoading(false)
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
    if (diffDays < 14) return "1 week ago"
    return date.toLocaleDateString()
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPLIED":
        return <Clock className="w-4 h-4" />
      case "SHORTLISTED":
        return <TrendingUp className="w-4 h-4" />
      case "INTERVIEW":
        return <Calendar className="w-4 h-4" />
      case "REJECTED":
        return <span className="text-base">✕</span>
      default:
        return <Briefcase className="w-4 h-4" />
    }
  }

  const activeApps = applications.filter(app => app.status === 'active')
  const closedApps = applications.filter(app => app.status === 'closed')

  const filteredApplications = 
    activeTab === 'active' ? activeApps :
    activeTab === 'closed' ? closedApps :
    applications

  return (
    <div className="flex flex-col min-h-svh bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">Applications</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/protected/swipe")}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Find Jobs
          </Button>
        </div>
        
        {/* Stats Overview */}
        {applications.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
            <div className="bg-primary/10 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">{applications.length}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Total</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{activeApps.length}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{closedApps.length}</div>
              <div className="text-xs text-muted-foreground">Closed</div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4">
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-1 sm:gap-2 p-3 sm:p-4 hover:bg-primary/5 hover:border-primary"
            onClick={() => router.push("/protected/generate-cv")}
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">Generate CV</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto flex-col gap-2 p-4 hover:bg-primary/5 hover:border-primary"
            onClick={() => router.push("/protected/generate-cover-letter")}
          >
            <FileEdit className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">Cover Letter</span>
          </Button>
        </div>
      </header>

      <TutorialOverlay tutorialKey="dashboard" steps={DASHBOARD_TUTORIAL} />

      <main className="px-4 sm:px-6 py-4 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
            <TabsTrigger value="all">
              All ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeApps.length})
            </TabsTrigger>
            <TabsTrigger value="closed">
              Closed ({closedApps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <JobListItemSkeleton key={i} />
                ))}
              </div>
            ) : filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <Card 
                  key={app.id} 
                  className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer"
                  onClick={() => router.push(`/protected/application/${app.id}`)}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg mb-1 truncate">{app.job.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-medium truncate">{app.job.company}</p>
                      </div>
                      <Badge 
                        className={`flex gap-1.5 items-center font-medium ${getStatusColor(app.applicationStatus)}`}
                      >
                        {getStatusIcon(app.applicationStatus)}
                        {app.applicationStatus}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {app.job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="gap-1">
                        <Briefcase className="w-3 h-3" />
                        {app.job.type}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <DollarSign className="w-3 h-3" />
                        {formatSalary(app.job.salary_min, app.job.salary_max)}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-muted-foreground pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{app.job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="whitespace-nowrap">Applied {formatDate(app.applied_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <EmptyState 
                type="no-applications" 
                onAction={() => router.push("/protected/swipe")} 
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

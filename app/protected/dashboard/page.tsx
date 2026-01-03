"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Calendar, CheckCircle2, Clock, MapPin, DollarSign, TrendingUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { initializeMockData, getApplications, type Application } from "@/lib/mock-data"

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
      case "applied":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "interviewing":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "offered":
        return "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary"
      case "rejected":
        return "bg-destructive/10 text-destructive dark:bg-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="w-4 h-4" />
      case "interviewing":
        return <Calendar className="w-4 h-4" />
      case "offered":
        return <CheckCircle2 className="w-4 h-4" />
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
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Applications</h1>
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
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{applications.length}</div>
              <div className="text-xs text-muted-foreground">Total</div>
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
      </header>

      <main className="p-4 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
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
                  <Card key={i} className="overflow-hidden border-2 animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-2 flex-1">
                          <div className="h-5 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </div>
                        <div className="h-6 w-20 bg-muted rounded"></div>
                      </div>
                      <div className="h-4 bg-muted rounded w-full mt-4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <Card key={app.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{app.job.title}</h3>
                        <p className="text-muted-foreground font-medium">{app.job.company}</p>
                      </div>
                      <Badge 
                        variant={app.status === 'active' ? 'default' : 'secondary'}
                        className="flex gap-1 items-center capitalize"
                      >
                        {getStatusIcon(app.status)}
                        {app.status}
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

                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {app.job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Applied {formatDate(app.applied_at)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === 'all' ? 'No applications yet' : 
                   activeTab === 'active' ? 'No active applications' : 
                   'No closed applications'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === 'all' 
                    ? 'Start swiping to find your perfect role!' 
                    : `You don't have any ${activeTab} applications.`}
                </p>
                {activeTab === 'all' && (
                  <Button onClick={() => router.push("/protected/swipe")} size="lg" className="gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Start Swiping
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

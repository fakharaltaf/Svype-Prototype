"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Calendar, CheckCircle2, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { initializeMockData, getApplications, type Application } from "@/lib/mock-data"

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Initialize mock data
    initializeMockData()
    // Get applications from mock data
    const apps = getApplications()
    setApplications(apps)
    setLoading(false)
  }, [])

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

  return (
    <div className="flex flex-col min-h-svh bg-background pb-20">
      <header className="p-4 border-b bg-background sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-bold">Applications</h1>
        <Button variant="ghost" size="sm" onClick={() => router.push("/protected/swipe")}>
          Swipe Jobs
        </Button>
      </header>

      <main className="p-4 flex-1">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
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
            ) : applications.length > 0 ? (
              applications.map((app) => (
                <Card key={app.id} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{app.job.title}</h3>
                        <p className="text-muted-foreground">{app.job.company}</p>
                      </div>
                      <Badge className={`flex gap-1 items-center capitalize ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {app.job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(app.applied_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No applications yet</h3>
                <p className="text-muted-foreground mb-6">Start swiping to find your next role!</p>
                <Button onClick={() => router.push("/protected/swipe")}>Start Swiping</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

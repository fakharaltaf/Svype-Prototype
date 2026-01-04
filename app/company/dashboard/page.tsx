// app/company/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, TrendingUp, Eye, Plus, Settings, LogOut, FileText, PenSquare, Sparkles, FileCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CompanyDashboard() {
  const router = useRouter()
  const [stats] = useState({
    activeJobs: 5,
    totalApplicants: 142,
    viewsThisWeek: 387,
    hiredThisMonth: 8,
  })

  const recentJobs = [
    { id: 1, title: "Senior Frontend Engineer", applicants: 23, status: "active", posted: "2 days ago" },
    { id: 2, title: "Product Designer", applicants: 18, status: "active", posted: "1 week ago" },
    { id: 3, title: "Backend Developer", applicants: 31, status: "active", posted: "1 week ago" },
    { id: 4, title: "Marketing Lead", applicants: 15, status: "closed", posted: "2 weeks ago" },
  ]

  const recentApplicants = [
    { id: 1, name: "Sarah Johnson", job: "Senior Frontend Engineer", status: "pending", applied: "2 hours ago" },
    { id: 2, name: "Michael Chen", job: "Product Designer", status: "pending", applied: "5 hours ago" },
    { id: 3, name: "Emma Wilson", job: "Backend Developer", status: "reviewing", applied: "1 day ago" },
    { id: 4, name: "James Brown", job: "Senior Frontend Engineer", status: "pending", applied: "1 day ago" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold truncate">TechCorp Inc.</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Company Dashboard</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => router.push("/company/posts")} className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Posts</span>
                <span className="sm:hidden">Posts</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="h-8 w-8 sm:h-10 sm:w-10">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="h-8 w-8 sm:h-10 sm:w-10">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-2">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{stats.activeJobs}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalApplicants}</p>
                  <p className="text-sm text-muted-foreground">Applicants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.viewsThisWeek}</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.hiredThisMonth}</p>
                  <p className="text-sm text-muted-foreground">Hired</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <Button size="lg" className="h-auto py-3 sm:py-4 text-sm" onClick={() => router.push("/company/post-job")}>
            <Plus className="w-5 h-5 mr-2" />
            Post New Job
          </Button>
          <Button size="lg" variant="outline" className="h-auto py-4" onClick={() => router.push("/company/review-applicants")}>
            <Users className="w-5 h-5 mr-2" />
            Review Applicants
          </Button>
          <Button size="lg" variant="outline" className="h-auto py-4 border-purple-200 dark:border-purple-900 hover:bg-purple-50 dark:hover:bg-purple-900/20" onClick={() => router.push("/company/ai-shortlist")}>
            <Sparkles className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            AI Shortlist
          </Button>
          <Button size="lg" variant="outline" className="h-auto py-4 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => router.push("/company/interview-results/1")}>
            <FileCheck className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Interview Results
          </Button>
          <Button size="lg" variant="outline" className="h-auto py-4" onClick={() => router.push("/company/posts")}>
            <PenSquare className="w-5 h-5 mr-2" />
            Create Post
          </Button>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="applicants">Recent Applicants</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-3 sm:space-y-4">
            {recentJobs.map((job) => (
              <Card key={job.id} className="border-2 hover:border-primary/30 transition-colors">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{job.title}</h3>
                        <Badge variant={job.status === "active" ? "default" : "secondary"}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          {job.applicants} applicants
                        </span>
                        <span className="text-xs sm:text-sm">Posted {job.posted}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="applicants" className="space-y-3 sm:space-y-4">
            {recentApplicants.map((applicant) => (
              <Card key={applicant.id} className="border-2 hover:border-primary/30 transition-colors">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-sm sm:text-base">{applicant.name}</h3>
                        <Badge variant="outline" className="text-[10px] sm:text-xs">
                          {applicant.status}
                        </Badge>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <p className="truncate">Applied for: {applicant.job}</p>
                        <p className="text-xs">{applicant.applied}</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full sm:w-auto text-xs sm:text-sm">Review</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

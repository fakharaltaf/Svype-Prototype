// app/company/ai-shortlist/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Sparkles,
  Star,
  Mail,
  MessageSquare,
  UserCheck,
  UserX,
  Download,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Candidate {
  id: string
  name: string
  email: string
  appliedDate: string
  matchScore: number
  avatar?: string
  experience: string
  location: string
  skills: string[]
  aiInsights: {
    strengths: string[]
    concerns: string[]
    recommendation: "strong-match" | "potential-match" | "weak-match"
  }
  status: "pending" | "shortlisted" | "rejected"
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    appliedDate: "2024-01-15",
    matchScore: 94,
    experience: "5 years",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Node.js", "System Design"],
    aiInsights: {
      strengths: [
        "Strong React expertise with 5+ years experience",
        "Excellent problem-solving in previous roles",
        "Leadership experience managing teams of 3-5"
      ],
      concerns: [
        "Limited experience with Vue.js mentioned in requirements"
      ],
      recommendation: "strong-match"
    },
    status: "pending"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    appliedDate: "2024-01-14",
    matchScore: 88,
    experience: "4 years",
    location: "Austin, TX",
    skills: ["React", "Python", "AWS", "Docker"],
    aiInsights: {
      strengths: [
        "Solid full-stack background",
        "Strong cloud infrastructure knowledge",
        "Quick learner based on career progression"
      ],
      concerns: [
        "Less experience than preferred for senior role",
        "No TypeScript mentioned in resume"
      ],
      recommendation: "potential-match"
    },
    status: "pending"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    appliedDate: "2024-01-13",
    matchScore: 92,
    experience: "6 years",
    location: "New York, NY",
    skills: ["React", "TypeScript", "GraphQL", "Testing"],
    aiInsights: {
      strengths: [
        "Extensive testing and quality assurance experience",
        "Strong technical writing and documentation",
        "Open source contributor"
      ],
      concerns: [],
      recommendation: "strong-match"
    },
    status: "shortlisted"
  },
  {
    id: "4",
    name: "David Park",
    email: "d.park@email.com",
    appliedDate: "2024-01-12",
    matchScore: 76,
    experience: "2 years",
    location: "Seattle, WA",
    skills: ["JavaScript", "React", "CSS", "Figma"],
    aiInsights: {
      strengths: [
        "Strong design sensibility",
        "Good communication skills"
      ],
      concerns: [
        "Limited professional experience",
        "Missing several required technical skills",
        "No backend experience"
      ],
      recommendation: "weak-match"
    },
    status: "pending"
  }
]

export default function AIShortlistPage() {
  const router = useRouter()
  const [candidates, setCandidates] = useState(mockCandidates)
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("match-score")

  const handleSelectCandidate = (id: string) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter(c => c !== id))
    } else {
      setSelectedCandidates([...selectedCandidates, id])
    }
  }

  const handleBulkShortlist = () => {
    setCandidates(candidates.map(c =>
      selectedCandidates.includes(c.id) ? { ...c, status: "shortlisted" as const } : c
    ))
    setSelectedCandidates([])
  }

  const handleBulkReject = () => {
    setCandidates(candidates.map(c =>
      selectedCandidates.includes(c.id) ? { ...c, status: "rejected" as const } : c
    ))
    setSelectedCandidates([])
  }

  const handleIndividualAction = (id: string, status: "shortlisted" | "rejected") => {
    setCandidates(candidates.map(c =>
      c.id === id ? { ...c, status } : c
    ))
  }

  const filteredCandidates = candidates.filter(c => {
    if (filterStatus === "all") return true
    return c.status === filterStatus
  })

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "match-score") return b.matchScore - a.matchScore
    if (sortBy === "date") return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    return 0
  })

  const getRecommendationColor = (rec: string) => {
    if (rec === "strong-match") return "text-green-600 dark:text-green-400"
    if (rec === "potential-match") return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getRecommendationBadge = (rec: string) => {
    if (rec === "strong-match") return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Strong Match</Badge>
    if (rec === "potential-match") return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">Potential Match</Badge>
    return <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">Weak Match</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">AI Candidate Shortlist</h1>
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">AI-Powered</span>
                  <span className="sm:hidden">AI</span>
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Senior Frontend Developer</p>
            </div>
            <Badge variant="outline" className="text-xs">{candidates.length}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Filters & Actions */}
        <Card className="p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[120px] sm:w-[150px] text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px] sm:w-[160px] text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match-score">Match Score</SelectItem>
                  <SelectItem value="date">Application Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCandidates.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">{selectedCandidates.length} selected</Badge>
                <Button size="sm" variant="default" onClick={handleBulkShortlist} className="text-xs">
                  <UserCheck className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Shortlist</span>
                </Button>
                <Button size="sm" variant="destructive" onClick={handleBulkReject} className="text-xs">
                  <UserX className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Reject</span>
                </Button>
              </div>
            )}

            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Export List</span>
            </Button>
          </div>
        </Card>

        {/* AI Insights Summary */}
        <Card className="p-5 sm:p-6 lg:p-7 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-900">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-purple-900 dark:text-purple-100 mb-4">
                AI Analysis Summary
              </h3>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {candidates.filter(c => c.aiInsights.recommendation === "strong-match").length}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">Strong Matches</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {candidates.filter(c => c.aiInsights.recommendation === "potential-match").length}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">Potential Matches</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {Math.round(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length)}%
                  </p>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">Avg Match Score</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Candidates List */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {sortedCandidates.map((candidate) => (
            <Card key={candidate.id} className="p-5 sm:p-6 lg:p-7">
              <div className="space-y-4 sm:space-y-5">
                {/* Header */}
                <div className="flex items-start gap-2 sm:gap-4">
                  <Checkbox
                    checked={selectedCandidates.includes(candidate.id)}
                    onCheckedChange={() => handleSelectCandidate(candidate.id)}
                    className="mt-1 flex-shrink-0"
                  />
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{candidate.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{candidate.email}</p>
                        <div className="flex items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                          <span>{candidate.experience}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="truncate">{candidate.location}</span>
                          <span className="hidden md:inline">•</span>
                          <span className="hidden md:inline">Applied {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {candidate.status === "shortlisted" && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                            <CheckCircle2 className="w-3 h-3 sm:mr-1" />
                            <span className="hidden sm:inline">Shortlisted</span>
                          </Badge>
                        )}
                        {candidate.status === "rejected" && (
                          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
                            <XCircle className="w-3 h-3 sm:mr-1" />
                            <span className="hidden sm:inline">Rejected</span>
                          </Badge>
                        )}
                        {candidate.status === "pending" && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 sm:mr-1" />
                            <span className="hidden sm:inline">Pending</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">AI Match Score</span>
                      {getRecommendationBadge(candidate.aiInsights.recommendation)}
                    </div>
                    <span className={`text-xl sm:text-2xl font-bold flex-shrink-0 ${getRecommendationColor(candidate.aiInsights.recommendation)}`}>
                      {candidate.matchScore}%
                    </span>
                  </div>
                  <Progress value={candidate.matchScore} className="h-2" />
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs sm:text-sm font-medium mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 lg:p-6 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                      ✓ Strengths
                    </p>
                    <ul className="text-xs sm:text-sm space-y-1">
                      {candidate.aiInsights.strengths.map((strength, index) => (
                        <li key={index} className="text-muted-foreground">• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  {candidate.aiInsights.concerns.length > 0 && (
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2">
                        ⚠ Considerations
                      </p>
                      <ul className="text-xs sm:text-sm space-y-1">
                        {candidate.aiInsights.concerns.map((concern, index) => (
                          <li key={index} className="text-muted-foreground">• {concern}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {candidate.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="default"
                      className="w-full sm:flex-1"
                      onClick={() => handleIndividualAction(candidate.id, "shortlisted")}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Shortlist Candidate
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Mail className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => handleIndividualAction(candidate.id, "rejected")}
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

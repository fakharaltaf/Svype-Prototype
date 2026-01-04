// app/company/interview-results/[id]/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Mail,
  Video,
  Eye,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BarChart3
} from "lucide-react"
import { useRouter } from "next/navigation"

interface InterviewQuestion {
  question: string
  score: number
  duration: string
  analysis: {
    clarity: number
    confidence: number
    relevance: number
  }
  transcript: string
  insights: string[]
}

const mockData = {
  candidate: {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    avatar: "",
    position: "Senior Frontend Developer"
  },
  overallScore: 87,
  reliability: 92,
  completedAt: "2024-01-15T14:30:00",
  duration: "45 minutes",
  aiAnalysis: {
    eyeMovement: {
      score: 88,
      naturalLooking: 94,
      screenReading: 12,
      distraction: 6
    },
    responseTiming: {
      averageThinkTime: "3.2s",
      consistency: 89,
      pausePatterns: "Natural"
    },
    confidenceScore: 85,
    behavioralPatterns: {
      enthusiasm: 92,
      authenticity: 87,
      professionalism: 94
    }
  },
  questions: [
    {
      question: "Tell me about your experience with React and how you've used it in recent projects.",
      score: 92,
      duration: "4:32",
      analysis: {
        clarity: 95,
        confidence: 90,
        relevance: 91
      },
      transcript: "I've been working with React for over 5 years now. In my current role at TechCorp, I lead a team building a customer portal that serves over 100,000 users. We use React with TypeScript, and I've implemented several performance optimizations including code splitting and lazy loading...",
      insights: [
        "Strong technical depth and specific examples",
        "Demonstrated leadership experience",
        "Good articulation of complex concepts"
      ]
    },
    {
      question: "How do you approach debugging a complex issue in production?",
      score: 85,
      duration: "3:45",
      analysis: {
        clarity: 88,
        confidence: 82,
        relevance: 85
      },
      transcript: "My approach is systematic. First, I try to reproduce the issue locally. If that's not possible, I check our monitoring tools like Sentry and DataDog to understand the error patterns. Then I review recent deployments...",
      insights: [
        "Methodical problem-solving approach",
        "Familiarity with industry-standard tools",
        "Slight hesitation initially, then strong recovery"
      ]
    },
    {
      question: "Describe a time when you had to make a difficult technical decision.",
      score: 88,
      duration: "5:12",
      analysis: {
        clarity: 90,
        confidence: 87,
        relevance: 87
      },
      transcript: "Last year, we had to decide between migrating to a microservices architecture or optimizing our monolith. The team was split, but I advocated for the monolith optimization because...",
      insights: [
        "Shows decision-making maturity",
        "Balanced perspective on tradeoffs",
        "Good storytelling structure"
      ]
    }
  ],
  strengths: [
    "Excellent technical knowledge and depth",
    "Strong communication and clarity",
    "Demonstrates leadership qualities",
    "Authentic and engaged responses",
    "Good problem-solving methodology"
  ],
  concerns: [
    "Slightly lower confidence on debugging question",
    "Could provide more specific metrics in examples"
  ],
  recommendation: {
    decision: "strong-recommend",
    reasoning: "Candidate demonstrates strong technical expertise, excellent communication skills, and leadership potential. High authenticity scores and natural behavioral patterns indicate genuine responses. Recommend advancing to final round."
  }
}

export default function InterviewResultsPage() {
  const router = useRouter()

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400"
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 85) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">AI Interview Analysis</h1>
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">AI-Powered</span>
                  <span className="sm:hidden">AI</span>
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{mockData.candidate.position}</p>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex text-xs sm:text-sm">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="icon" className="sm:hidden flex-shrink-0">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Candidate Info */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
              <AvatarImage src={mockData.candidate.avatar} />
              <AvatarFallback>
                {mockData.candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold">{mockData.candidate.name}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{mockData.candidate.email}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  {mockData.duration}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="truncate">Completed {new Date(mockData.completedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-initial text-xs sm:text-sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Message</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-initial text-xs sm:text-sm">
                <Video className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Watch Recording</span>
                <span className="sm:hidden">Recording</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Overall Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold">Overall Performance</h3>
                <Badge variant={getScoreVariant(mockData.overallScore)}>
                  {mockData.overallScore >= 85 ? "Excellent" : mockData.overallScore >= 70 ? "Good" : "Fair"}
                </Badge>
              </div>
              <div className="text-center py-3 sm:py-4">
                <div className={`text-4xl sm:text-5xl font-bold ${getScoreColor(mockData.overallScore)}`}>
                  {mockData.overallScore}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">out of 100</p>
              </div>
              <Progress value={mockData.overallScore} className="h-2 sm:h-3" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold">Response Reliability</h3>
                <Badge variant="outline" className="gap-1 text-xs">
                  <Target className="w-3 h-3" />
                  AI Verified
                </Badge>
              </div>
              <div className="text-center py-3 sm:py-4">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
                  {mockData.reliability}%
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">authenticity score</p>
              </div>
              <Progress value={mockData.reliability} className="h-2 sm:h-3" />
              <p className="text-xs text-muted-foreground text-center">
                Based on eye movement, timing patterns, and behavioral analysis
              </p>
            </div>
          </Card>
        </div>

        {/* AI Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="recommendation" className="col-span-2 sm:col-span-1">Recommendation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                Eye Movement Analysis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Natural Looking</span>
                    <span className="font-semibold">{mockData.aiAnalysis.eyeMovement.naturalLooking}%</span>
                  </div>
                  <Progress value={mockData.aiAnalysis.eyeMovement.naturalLooking} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Screen Reading</span>
                    <span className="font-semibold">{mockData.aiAnalysis.eyeMovement.screenReading}%</span>
                  </div>
                  <Progress value={mockData.aiAnalysis.eyeMovement.screenReading} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Distraction</span>
                    <span className="font-semibold">{mockData.aiAnalysis.eyeMovement.distraction}%</span>
                  </div>
                  <Progress value={mockData.aiAnalysis.eyeMovement.distraction} className="h-2" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                High natural looking percentage indicates authentic responses without excessive script reading.
              </p>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                Response Timing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Average Think Time</p>
                  <p className="text-xl sm:text-2xl font-bold">{mockData.aiAnalysis.responseTiming.averageThinkTime}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Consistency</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl sm:text-2xl font-bold">{mockData.aiAnalysis.responseTiming.consistency}%</p>
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pause Patterns</p>
                  <Badge variant="outline" className="mt-1">{mockData.aiAnalysis.responseTiming.pausePatterns}</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Behavioral Tab */}
          <TabsContent value="behavioral" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold mb-4 sm:mb-6">Behavioral Pattern Analysis</h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Enthusiasm</span>
                    <span className="font-semibold">{mockData.aiAnalysis.behavioralPatterns.enthusiasm}%</span>
                  </div>
                  <Progress value={mockData.aiAnalysis.behavioralPatterns.enthusiasm} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Authenticity</span>
                    <span className="font-semibold">{mockData.aiAnalysis.behavioralPatterns.authenticity}%</span>
                  </div>
                  <Progress value={mockData.aiAnalysis.behavioralPatterns.authenticity} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Professionalism</span>
                    <span className="font-semibold">{mockData.aiAnalysis.behavioralPatterns.professionalism}%</span>
                  </div>
                  <Progress value={mockData.aiAnalysis.behavioralPatterns.professionalism} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="font-semibold">{mockData.aiAnalysis.confidenceScore}%</span>
                  </div>
                  <Progress value={mockData.aiAnalysis.confidenceScore} className="h-2" />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <h4 className="text-sm sm:text-base font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Identified Strengths
                </h4>
                <ul className="space-y-2">
                  {mockData.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-green-800 dark:text-green-200">
                      • {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              {mockData.concerns.length > 0 && (
                <Card className="p-4 sm:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900">
                  <h4 className="text-sm sm:text-base font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Areas for Discussion
                  </h4>
                  <ul className="space-y-2">
                    {mockData.concerns.map((concern, index) => (
                      <li key={index} className="text-sm text-yellow-800 dark:text-yellow-200">
                        • {concern}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-3 sm:space-y-4">
            {mockData.questions.map((q, index) => (
              <Card key={index} className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">Question {index + 1}</Badge>
                        <Badge variant={getScoreVariant(q.score)} className="text-xs">{q.score}/100</Badge>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold">{q.question}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2">Duration: {q.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Clarity</p>
                      <Progress value={q.analysis.clarity} className="h-1.5 sm:h-2 mb-1" />
                      <p className="text-xs sm:text-sm font-semibold">{q.analysis.clarity}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                      <Progress value={q.analysis.confidence} className="h-2 mb-1" />
                      <p className="text-sm font-semibold">{q.analysis.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Relevance</p>
                      <Progress value={q.analysis.relevance} className="h-2 mb-1" />
                      <p className="text-sm font-semibold">{q.analysis.relevance}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Transcript</p>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                      {q.transcript}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">AI Insights</p>
                    <ul className="space-y-1">
                      {q.insights.map((insight, i) => (
                        <li key={i} className="text-sm text-muted-foreground">• {insight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Recommendation Tab */}
          <TabsContent value="recommendation" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-900">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 dark:bg-green-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-green-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                    Strong Recommendation to Proceed
                  </h3>
                  <p className="text-xs sm:text-sm text-green-800 dark:text-green-200">
                    {mockData.recommendation.reasoning}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                Key Metrics Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Performance</span>
                    <span className="font-semibold">{mockData.overallScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Reliability</span>
                    <span className="font-semibold">{mockData.reliability}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Confidence Score</span>
                    <span className="font-semibold">{mockData.aiAnalysis.confidenceScore}%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enthusiasm</span>
                    <span className="font-semibold">{mockData.aiAnalysis.behavioralPatterns.enthusiasm}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authenticity</span>
                    <span className="font-semibold">{mockData.aiAnalysis.behavioralPatterns.authenticity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Professionalism</span>
                    <span className="font-semibold">{mockData.aiAnalysis.behavioralPatterns.professionalism}%</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button className="flex-1 text-xs sm:text-sm" size="lg">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="hidden sm:inline">Advance to Next Round</span>
                <span className="sm:hidden">Advance</span>
              </Button>
              <Button variant="outline" size="lg" className="text-xs sm:text-sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Send Feedback
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

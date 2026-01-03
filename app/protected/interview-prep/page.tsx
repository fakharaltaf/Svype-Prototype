"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronLeft, Book, Video, CheckCircle2, Star, Clock, 
  Lightbulb, Target, TrendingUp, MessageSquare 
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function InterviewPrepPage() {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const topics = [
    {
      id: "behavioral",
      title: "Behavioral Questions",
      icon: "💬",
      description: "Common behavioral interview questions and how to answer them",
      questions: 15,
      duration: "30 min"
    },
    {
      id: "technical",
      title: "Technical Questions",
      icon: "💻",
      description: "Technical questions for software engineering roles",
      questions: 20,
      duration: "45 min"
    },
    {
      id: "system-design",
      title: "System Design",
      icon: "🏗️",
      description: "Learn how to approach system design interviews",
      questions: 10,
      duration: "60 min"
    },
    {
      id: "culture-fit",
      title: "Culture Fit",
      icon: "🤝",
      description: "Questions about company culture and values",
      questions: 12,
      duration: "20 min"
    },
  ]

  const resources = [
    {
      id: "1",
      type: "article",
      title: "The STAR Method for Behavioral Interviews",
      description: "Learn how to structure your answers using Situation, Task, Action, Result",
      readTime: "5 min read",
      popular: true
    },
    {
      id: "2",
      type: "video",
      title: "Mock Interview: Senior Frontend Engineer",
      description: "Watch a full mock interview and learn from expert feedback",
      readTime: "45 min watch",
      popular: true
    },
    {
      id: "3",
      type: "article",
      title: "10 Questions You Should Ask Interviewers",
      description: "Impress employers with thoughtful questions about the role",
      readTime: "4 min read",
      popular: false
    },
    {
      id: "4",
      type: "video",
      title: "Handling Salary Negotiations",
      description: "Tips for discussing compensation confidently",
      readTime: "20 min watch",
      popular: true
    },
  ]

  const behavioralQuestions = [
    {
      question: "Tell me about yourself",
      tips: [
        "Keep it professional and relevant to the role",
        "Structure: Present → Past → Future",
        "Highlight key achievements and skills",
        "Keep it under 2 minutes"
      ],
      example: "I'm currently a frontend engineer with 5 years of experience building scalable web applications. In my previous role at TechCorp, I led a team of 4 developers and increased page load speed by 40%. I'm now looking for opportunities to expand my leadership skills while continuing to work with modern technologies like React and Next.js."
    },
    {
      question: "What are your greatest strengths?",
      tips: [
        "Choose 2-3 strengths relevant to the job",
        "Provide specific examples",
        "Show how your strengths benefit the team",
        "Be genuine and confident"
      ],
      example: "One of my greatest strengths is problem-solving. For example, when our application faced performance issues affecting thousands of users, I analyzed the codebase, identified bottlenecks, and implemented optimizations that improved load times by 60%. I also excel at collaboration—I believe the best solutions come from diverse perspectives."
    },
    {
      question: "Describe a challenging situation and how you overcame it",
      tips: [
        "Use the STAR method",
        "Choose a relevant professional example",
        "Focus on your actions and decisions",
        "End with the positive outcome"
      ],
      example: "In my last project, we had a tight deadline and discovered a critical security vulnerability two days before launch (Situation). As the lead developer, I needed to fix it without delaying the launch (Task). I quickly assembled a small team, we worked through the weekend implementing a patch and comprehensive tests (Action). We launched on time with zero security issues and received praise from the client (Result)."
    },
  ]

  const tips = [
    {
      title: "Research the Company",
      description: "Understand their products, values, and recent news. Show genuine interest.",
      icon: <Target className="w-5 h-5" />
    },
    {
      title: "Prepare Your Stories",
      description: "Have 5-7 STAR stories ready that showcase different skills and situations.",
      icon: <Book className="w-5 h-5" />
    },
    {
      title: "Practice Out Loud",
      description: "Rehearse your answers verbally, not just in your head. Record yourself if possible.",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: "Ask Smart Questions",
      description: "Prepare 3-5 thoughtful questions about the role, team, and company.",
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      title: "Plan Your Logistics",
      description: "Test your tech setup for video calls. Arrive 10 minutes early for in-person interviews.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Follow Up",
      description: "Send a thank-you email within 24 hours. Reiterate your interest and key points.",
      icon: <CheckCircle2 className="w-5 h-5" />
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Interview Preparation</h1>
            <p className="text-sm text-muted-foreground">Ace your next interview</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-4 max-w-4xl mx-auto w-full">
        {/* Hero Card */}
        <Card className="border-2 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Prepare to Succeed</h2>
                <p className="text-muted-foreground">
                  Master common interview questions, learn proven techniques, and boost your confidence with our comprehensive preparation resources.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="questions">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-4">
            <h3 className="text-lg font-bold">Practice by Category</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <Card 
                  key={topic.id}
                  className="border-2 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg"
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <CardContent className="p-5">
                    <div className="text-3xl mb-3">{topic.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>📝 {topic.questions} questions</span>
                      <span>⏱️ {topic.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-bold pt-4">Common Questions</h3>
            {behavioralQuestions.map((item, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-start gap-2">
                    <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    {item.question}
                  </h4>

                  <div className="mb-4">
                    <p className="font-medium mb-2 text-sm">How to Answer:</p>
                    <ul className="space-y-2">
                      {item.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="font-medium mb-2 text-sm">Example Answer:</p>
                    <p className="text-sm text-muted-foreground italic">"{item.example}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <h3 className="text-lg font-bold">Learning Resources</h3>
            {resources.map((resource) => (
              <Card 
                key={resource.id}
                className="border-2 hover:border-primary/50 transition-all cursor-pointer"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {resource.type === "article" ? (
                        <Book className="w-5 h-5 text-primary mt-1" />
                      ) : (
                        <Video className="w-5 h-5 text-primary mt-1" />
                      )}
                      <div>
                        <h4 className="font-bold mb-1">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.readTime}
                          </Badge>
                          {resource.popular && (
                            <Badge className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              <Star className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            <h3 className="text-lg font-bold">Interview Success Tips</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-2">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Pro Tip: Practice Makes Perfect
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  The best way to prepare is through practice. Try recording yourself answering common questions, or better yet, do mock interviews with friends or mentors. The more you practice, the more natural and confident you'll become.
                </p>
                <Button size="sm">
                  Schedule Mock Interview
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

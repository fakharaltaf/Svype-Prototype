// app/company/post-job/page.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, HelpCircle, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [requirements, setRequirements] = useState<string[]>(["React", "TypeScript"])
  const [newRequirement, setNewRequirement] = useState("")
  const [enablePreScreening, setEnablePreScreening] = useState(false)
  const [enableAIInterview, setEnableAIInterview] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full-time",
    salaryMin: "",
    salaryMax: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Job Posted!",
      description: "Your job posting is now live and visible to candidates.",
    })
    setTimeout(() => router.push("/company/dashboard"), 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Post a New Job</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Engineer"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="London, UK or Remote"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Minimum Salary (£)</Label>
                  <Input
                    id="salaryMin"
                    name="salaryMin"
                    type="number"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="40000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Maximum Salary (£)</Label>
                  <Input
                    id="salaryMax"
                    name="salaryMax"
                    type="number"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="60000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                  rows={6}
                  className="resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add a requirement (e.g. 5+ years experience)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 text-sm py-1 px-3">
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pre-Screening Options */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Pre-Screening
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quiz Toggle */}
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="enable-quiz">Enable Pre-Screening Quiz</Label>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Candidates will answer questions before their application is reviewed
                  </p>
                </div>
                <Switch
                  id="enable-quiz"
                  checked={enablePreScreening}
                  onCheckedChange={setEnablePreScreening}
                />
              </div>

              {enablePreScreening && (
                <div className="pl-4 border-l-2 border-primary/20 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/company/add-quiz-questions")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Quiz Questions
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Create custom questions to assess candidates' skills and knowledge
                  </p>
                </div>
              )}

              {/* AI Interview Toggle */}
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="enable-ai-interview">Enable AI Interview Analysis</Label>
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI will conduct video interviews and analyze candidate responses
                  </p>
                </div>
                <Switch
                  id="enable-ai-interview"
                  checked={enableAIInterview}
                  onCheckedChange={setEnableAIInterview}
                />
              </div>

              {enableAIInterview && (
                <div className="pl-4 border-l-2 border-primary/20">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm">
                      <strong>AI Interview Features:</strong>
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Eye movement tracking</li>
                      <li>• Response timing analysis</li>
                      <li>• Confidence scoring</li>
                      <li>• Behavioral pattern detection</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Post Job
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

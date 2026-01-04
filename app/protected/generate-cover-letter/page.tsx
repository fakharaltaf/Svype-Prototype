// app/protected/generate-cover-letter/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Download, Copy, Sparkles, FileText, RotateCw, Check } from "lucide-react"
import { useRouter } from "next/navigation"

const toneOptions = [
  { value: "professional", label: "Professional", description: "Formal and business-like" },
  { value: "enthusiastic", label: "Enthusiastic", description: "Passionate and energetic" },
  { value: "confident", label: "Confident", description: "Strong and assertive" },
  { value: "creative", label: "Creative", description: "Unique and innovative" }
]

const mockJobs = [
  { 
    id: "1", 
    title: "Senior Frontend Engineer", 
    company: "TechCorp Inc.",
    description: "Looking for an experienced React developer..."
  },
  { 
    id: "2", 
    title: "Full Stack Developer", 
    company: "StartupXYZ",
    description: "Join our fast-growing startup..."
  },
  { 
    id: "3", 
    title: "React Developer", 
    company: "Digital Agency",
    description: "Creative agency seeking talented developer..."
  }
]

export default function GenerateCoverLetterPage() {
  const router = useRouter()
  const [selectedJob, setSelectedJob] = useState<string>("")
  const [selectedTone, setSelectedTone] = useState("professional")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const selectedJobData = mockJobs.find(j => j.id === selectedJob)
    const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${selectedJobData?.title} position at ${selectedJobData?.company}. With over 5 years of experience in full-stack development and a proven track record of delivering high-quality web applications, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed expertise in React, TypeScript, Node.js, and modern cloud technologies. At my current role at Tech Corp, I have led the development of several customer-facing applications that serve millions of users, resulting in a 40% increase in user engagement and a 25% improvement in application performance.

What particularly excites me about this opportunity at ${selectedJobData?.company} is ${selectedJobData?.description.toLowerCase()} I am passionate about creating exceptional user experiences and believe my technical skills combined with my collaborative approach would make me an ideal fit for your team.

${additionalNotes ? `\n${additionalNotes}\n\n` : ''}I would welcome the opportunity to discuss how my experience and skills align with your needs. Thank you for considering my application.

Sincerely,
John Doe`

    setGeneratedLetter(letter)
    setIsGenerating(false)
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cover-letter.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Generate Cover Letter</h1>
              <p className="text-sm text-muted-foreground">AI-powered, tailored to each job</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Job Selection */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Select Job</h2>
              <p className="text-sm text-muted-foreground">
                Choose the position you're applying for
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </Badge>
          </div>
          
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a job to generate cover letter" />
            </SelectTrigger>
            <SelectContent>
              {mockJobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{job.title}</span>
                    <span className="text-xs text-muted-foreground">{job.company}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedJob && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-1">
                {mockJobs.find(j => j.id === selectedJob)?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {mockJobs.find(j => j.id === selectedJob)?.company}
              </p>
            </div>
          )}
        </Card>

        {/* Tone Selection */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Choose Tone</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                  selectedTone === tone.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <p className="font-medium text-sm">{tone.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{tone.description}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Additional Notes */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Additional Information (Optional)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add any specific points you'd like to mention in your cover letter
          </p>
          <Textarea
            placeholder="e.g., mention a specific project, connection to the company, or relevant achievement..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </Card>

        {/* Generate Button */}
        {!generatedLetter && (
          <Button
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            disabled={!selectedJob || isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Cover Letter
              </>
            )}
          </Button>
        )}

        {/* Generated Letter */}
        {generatedLetter && (
          <>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Cover Letter</h2>
                <Badge variant="secondary" className="gap-1">
                  <FileText className="w-3 h-3" />
                  AI Generated
                </Badge>
              </div>
              
              <div className="bg-white dark:bg-muted p-6 rounded-lg border min-h-[400px]">
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                  {generatedLetter}
                </pre>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                <span>Tailored for {mockJobs.find(j => j.id === selectedJob)?.title} at {mockJobs.find(j => j.id === selectedJob)?.company}</span>
              </div>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={isGenerating}
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button
                variant="outline"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

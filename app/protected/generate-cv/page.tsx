// app/protected/generate-cv/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2, Sparkles, FileText, Eye, Wand2 } from "lucide-react"
import { useRouter } from "next/navigation"

const cvTemplates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design",
    preview: "/templates/modern.png"
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional and elegant",
    preview: "/templates/classic.png"
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold and artistic",
    preview: "/templates/creative.png"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and focused",
    preview: "/templates/minimal.png"
  }
]

const mockJobs = [
  { id: "1", title: "Senior Frontend Engineer", company: "TechCorp Inc." },
  { id: "2", title: "Full Stack Developer", company: "StartupXYZ" },
  { id: "3", title: "React Developer", company: "Digital Agency" }
]

export default function GenerateCVPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState(cvTemplates[0].id)
  const [selectedJob, setSelectedJob] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setIsGenerated(true)
  }

  const handleDownload = () => {
    // Simulate PDF download
    console.log("Downloading CV as PDF...")
  }

  const handleShare = () => {
    // Simulate share functionality
    console.log("Sharing CV...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Generate CV</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Create AI-powered CVs tailored to jobs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <Tabs defaultValue="customize" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 text-xs sm:text-sm">
            <TabsTrigger value="customize">
              <Wand2 className="w-4 h-4 mr-2" />
              Customize
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!isGenerated}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="space-y-6">
            {/* Template Selection */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Choose Template</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cvTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative aspect-[3/4] rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
                      selectedTemplate === template.id
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-primary/30" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-2">
                      <p className="text-xs font-medium truncate">{template.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Job Selection */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Tailor for Job (Optional)</h2>
                  <p className="text-sm text-muted-foreground">
                    Select a job to customize your CV with relevant keywords and skills
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Powered
                </Badge>
              </div>
              
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a job or leave blank for general CV" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">General CV (no specific job)</SelectItem>
                  {mockJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedJob && selectedJob !== "none" && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">AI Optimization Active</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your CV will be optimized with keywords from the job description,
                        relevant experience highlighted, and skills matched to requirements.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Profile Preview */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Your Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-primary">JD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Senior Full-Stack Developer</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">5+ years experience</Badge>
                      <Badge variant="outline" className="text-xs">10 skills</Badge>
                      <Badge variant="outline" className="text-xs">3 companies</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Data from your profile. You can edit in{" "}
                  <button
                    onClick={() => router.push("/protected/profile")}
                    className="text-primary hover:underline"
                  >
                    Profile Settings
                  </button>
                </p>
              </div>
            </Card>

            {/* Generate Button */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate CV
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {/* CV Preview */}
            <Card className="p-6">
              <div className="aspect-[1/1.414] bg-white rounded-lg shadow-lg border overflow-hidden">
                <div className="h-full p-8 text-black">
                  <div className="border-b-2 border-primary pb-4 mb-4">
                    <h1 className="text-3xl font-bold">John Doe</h1>
                    <p className="text-lg text-gray-600">Senior Full-Stack Developer</p>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h2 className="font-bold text-primary mb-2">CONTACT</h2>
                      <p>john.doe@example.com</p>
                      <p>+44 7700 900123</p>
                      <p>London, UK</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-primary mb-2">PROFESSIONAL SUMMARY</h2>
                      <p className="text-gray-700">
                        Experienced full-stack developer with 5+ years building scalable web applications...
                      </p>
                    </div>
                    <div>
                      <h2 className="font-bold text-primary mb-2">EXPERIENCE</h2>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold">Senior Developer - Tech Corp</p>
                          <p className="text-gray-600">2021 - Present</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

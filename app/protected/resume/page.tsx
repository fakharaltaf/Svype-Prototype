// app/protected/resume/page.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, FileText, Link2, Plus, Edit2, Trash2, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ResumePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [hasResume, setHasResume] = useState(true)

  const handleUpload = () => {
    toast({
      title: "Upload functionality",
      description: "File upload would be implemented here.",
    })
  }

  const portfolioLinks = [
    { id: 1, title: "Personal Website", url: "https://example.com", type: "website" },
    { id: 2, title: "GitHub Profile", url: "https://github.com/username", type: "github" },
    { id: 3, title: "LinkedIn", url: "https://linkedin.com/in/username", type: "linkedin" },
  ]

  const skills = [
    "React", "TypeScript", "Next.js", "Node.js", "Python", 
    "UI/UX Design", "Figma", "AWS", "Docker", "PostgreSQL"
  ]

  return (
    <div className="flex flex-col min-h-svh bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Resume & Portfolio</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Resume Section */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Resume/CV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasResume ? (
              <div className="border-2 border-dashed rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Resume_2026.pdf</p>
                    <p className="text-sm text-muted-foreground">Uploaded 2 weeks ago • 245 KB</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your resume to help employers learn more about you
                </p>
              </div>
            )}
            <Button className="w-full gap-2" onClick={handleUpload}>
              <Upload className="w-4 h-4" />
              {hasResume ? "Upload New Resume" : "Upload Resume"}
            </Button>
          </CardContent>
        </Card>

        {/* Portfolio Links */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Link2 className="w-5 h-5 text-primary" />
                Portfolio Links
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {portfolioLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Link2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{link.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Skills & Technologies</CardTitle>
              <Button variant="ghost" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="gap-1 hover:bg-muted cursor-pointer">
                  {skill}
                  <button className="ml-1 hover:text-destructive">×</button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Work Experience</CardTitle>
              <Button variant="ghost" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-2 border-primary pl-4 py-2">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">Senior Developer</h3>
                  <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">2022 - Present</p>
              <p className="text-sm">Led development of customer-facing web applications using React and Node.js.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

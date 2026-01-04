// app/protected/import-data/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, ArrowRight, Loader2, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ImportDataPage() {
  const router = useRouter()
  const [linkedinStatus, setLinkedinStatus] = useState<"idle" | "loading" | "success">("idle")
  const [githubStatus, setGithubStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleLinkedInImport = async () => {
    setLinkedinStatus("loading")
    // Simulate import
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLinkedinStatus("success")
  }

  const handleGithubImport = async () => {
    setGithubStatus("loading")
    // Simulate import
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGithubStatus("success")
  }

  const handleContinue = () => {
    router.push("/protected/profile-preview")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20 p-6">
      {/* Header */}
      <div className="max-w-md mx-auto w-full pt-8 pb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Import Your Data</h1>
          <p className="text-muted-foreground">
            Speed up your profile by importing data from LinkedIn or GitHub (optional)
          </p>
        </div>

        {/* Import Cards */}
        <div className="space-y-4 mb-8">
          {/* LinkedIn Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-6 h-6 text-[#0A66C2]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Connect LinkedIn</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Import your work experience, education, and skills
                </p>
                {linkedinStatus === "success" ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Data imported successfully</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleLinkedInImport}
                    disabled={linkedinStatus === "loading"}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    {linkedinStatus === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Linkedin className="w-4 h-4 mr-2" />
                        Connect LinkedIn
                      </>
                    )}
                  </Button>
                )}
                {linkedinStatus === "loading" && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span>Fetching profile data...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* GitHub Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-foreground/10 flex items-center justify-center flex-shrink-0">
                <Github className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Connect GitHub</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Showcase your projects, contributions, and technical skills
                </p>
                {githubStatus === "success" ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Data imported successfully</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleGithubImport}
                    disabled={githubStatus === "loading"}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    {githubStatus === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Github className="w-4 h-4 mr-2" />
                        Connect GitHub
                      </>
                    )}
                  </Button>
                )}
                {githubStatus === "loading" && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span>Analyzing repositories...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Info Banner */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Your data is encrypted and only used to enhance your job applications. You can disconnect anytime from settings.
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="max-w-md mx-auto w-full mt-auto space-y-3">
        <Button
          size="lg"
          className="w-full"
          onClick={handleContinue}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <button
          onClick={handleContinue}
          className="w-full text-center text-sm text-muted-foreground py-2 hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

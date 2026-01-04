// app/protected/upload-cv/page.tsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UploadCVPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return
    
    setIsUploading(true)
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      // Redirect to swipe page after successful upload
      router.push("/protected/swipe")
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 p-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-2xl border-2">
          <CardContent className="p-8 space-y-8">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Upload Your CV</h1>
              <p className="text-muted-foreground">
                Upload your resume to start applying to jobs. We'll extract your information automatically.
              </p>
            </div>

            {/* Upload Area */}
            <div className="space-y-4">
              <Label htmlFor="cv-upload" className="text-base font-medium">
                Resume/CV (PDF, DOC, DOCX)
              </Label>
              
              {!file ? (
                <label
                  htmlFor="cv-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-muted/20"
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, or DOCX (MAX. 10MB)
                      </p>
                    </div>
                  </div>
                  <Input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 border-2 border-primary/50 rounded-xl bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Your CV is securely stored and only shared with companies you apply to
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  We'll auto-fill your profile information from your CV
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  You can update or replace your CV anytime in settings
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                {isUploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    Continue <ArrowRight size={20} />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

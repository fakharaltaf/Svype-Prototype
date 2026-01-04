// app/company/onboarding/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Building2, Users, MapPin, Globe, CheckCircle2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees"
]

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Marketing",
  "Real Estate",
  "Other"
]

export default function CompanyOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    location: "",
    size: "",
    industry: "",
    description: "",
    logoUrl: ""
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    // Simulate submission
    console.log("Company onboarding data:", formData)
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push("/company/dashboard")
  }

  const isStepValid = () => {
    if (step === 1) {
      return formData.companyName && formData.website && formData.location
    }
    if (step === 2) {
      return formData.size && formData.industry
    }
    if (step === 3) {
      return formData.description
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Company Setup</h1>
          <p className="text-muted-foreground">
            Let's get your company profile set up to start hiring
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Tell us about your company
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="e.g., TechCorp Inc."
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="website">Website *</Label>
                <div className="relative mt-2">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.yourcompany.com"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Headquarters Location *</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., London, UK"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo">Company Logo (Optional)</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Company Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Company Details</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Help candidates understand your organization
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="size">Company Size *</Label>
                <Select value={formData.size} onValueChange={(value) => handleChange("size", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {size}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {industry}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: About Company */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">About Your Company</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Share your company's story and culture
              </p>
            </div>

            <div>
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your company, mission, values, and what makes it a great place to work..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={8}
                className="mt-2 resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {formData.description.length} characters (minimum 100 recommended)
              </p>
            </div>

            {/* Preview */}
            <Card className="p-4 bg-muted/50">
              <p className="text-sm font-medium mb-2">Preview</p>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{formData.companyName || "Your Company"}</h3>
                  <p className="text-sm text-muted-foreground">{formData.location || "Location"}</p>
                  <div className="flex gap-2 mt-2">
                    {formData.size && <Badge variant="outline" className="text-xs">{formData.size}</Badge>}
                    {formData.industry && <Badge variant="outline" className="text-xs">{formData.industry}</Badge>}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            Previous
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
            >
              Complete Setup
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

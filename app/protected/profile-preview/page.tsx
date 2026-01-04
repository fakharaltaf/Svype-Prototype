// app/protected/profile-preview/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Briefcase, Calendar, Mail, Phone, Edit, CheckCircle, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePreviewPage() {
  const router = useRouter()

  // Mock profile data (would come from AI chat + imports)
  const profileData = {
    name: "John Doe",
    headline: "Senior Full-Stack Developer",
    email: "john.doe@example.com",
    phone: "+44 7700 900123",
    location: "London, UK",
    summary: "Experienced full-stack developer with 5+ years building scalable web applications. Passionate about React, Node.js, and cloud technologies. Looking for remote opportunities in innovative tech companies.",
    skills: [
      "React", "TypeScript", "Node.js", "Next.js", "Python",
      "AWS", "Docker", "PostgreSQL", "MongoDB", "REST APIs"
    ],
    experience: [
      {
        title: "Senior Developer",
        company: "Tech Corp",
        location: "London, UK",
        period: "2021 - Present",
        description: "Leading development of customer-facing web applications"
      },
      {
        title: "Full-Stack Developer",
        company: "StartupXYZ",
        location: "Remote",
        period: "2019 - 2021",
        description: "Built and maintained multiple microservices and frontend applications"
      }
    ],
    education: [
      {
        degree: "BSc Computer Science",
        institution: "University of London",
        period: "2015 - 2019"
      }
    ],
    preferences: {
      jobType: ["Full-time", "Remote"],
      salaryMin: "£50,000",
      salaryMax: "£80,000",
      location: "London or Remote"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Your Profile Preview</h1>
          <p className="text-sm text-muted-foreground">Review your AI-generated profile</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
              <p className="text-muted-foreground mb-2">{profileData.headline}</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground text-sm">{profileData.summary}</p>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Skills</h3>
            <Badge variant="secondary">{profileData.skills.length} skills</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Experience */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Experience</h3>
          <div className="space-y-4">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="relative pl-6 pb-4 last:pb-0">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary" />
                {index !== profileData.experience.length - 1 && (
                  <div className="absolute left-[5px] top-6 w-0.5 h-full bg-border" />
                )}
                
                <div>
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Education */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Education</h3>
          <div className="space-y-3">
            {profileData.education.map((edu, index) => (
              <div key={index}>
                <h4 className="font-medium">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Job Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Job Type</p>
                <div className="flex gap-2 mt-1">
                  {profileData.preferences.jobType.map((type, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Salary Expectations</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {profileData.preferences.salaryMin} - {profileData.preferences.salaryMax}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Preferred Location</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {profileData.preferences.location}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Generation Badge */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Profile Generated with AI</p>
              <p className="text-xs text-muted-foreground mt-1">
                We've created your profile based on your responses and imported data. You can edit any section from your profile page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => router.push("/protected/profile")}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => router.push("/protected/swipe")}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Looks Good, Start Swiping
          </Button>
        </div>
      </div>
    </div>
  )
}

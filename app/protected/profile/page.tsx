"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, LogOut, ChevronRight, Briefcase, Heart, Target, User, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { initializeMockData, getProfile, type Profile } from "@/lib/mock-data"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Initialize mock data
    initializeMockData()
    // Get profile from mock data
    const userProfile = getProfile()
    setProfile(userProfile)
    setLoading(false)
  }, [])

  const handleSignOut = () => {
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-svh bg-background pb-20">
        <header className="p-4 border-b bg-background flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </header>
        <main className="p-4 space-y-6">
          <div className="flex flex-col items-center py-6">
            <div className="w-24 h-24 rounded-full bg-muted animate-pulse"></div>
            <div className="h-7 w-32 bg-muted rounded mt-4 animate-pulse"></div>
            <div className="h-4 w-48 bg-muted rounded mt-2 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2 animate-pulse">
                <CardContent className="p-4">
                  <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6 mt-2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-svh bg-background pb-20">
      <header className="p-4 border-b bg-background flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <main className="p-4 space-y-6">
        <div className="flex flex-col items-center py-6">
          <Avatar className="w-24 h-24 border-4 border-primary/20">
            <AvatarImage src="/diverse-person-portrait.png" />
            <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">{profile?.full_name}</h2>
          <p className="text-muted-foreground">{profile?.email}</p>
          <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">
            AI Coached
          </Badge>
        </div>

        <div className="space-y-4">
          <ProfileSection
            icon={<Target className="w-5 h-5 text-primary" />}
            title="Career Goals"
            content={profile?.career_goals}
          />
          <ProfileSection icon={<Briefcase className="w-5 h-5 text-primary" />} title="Professional Interests">
            <div className="flex flex-wrap gap-2 mt-2">
              {profile?.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </ProfileSection>
          <ProfileSection
            icon={<Heart className="w-5 h-5 text-primary" />}
            title="Life Aspirations"
            content={profile?.life_goals}
          />
        </div>

        <Card className="border-2 mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SettingsItem icon={<User className="w-5 h-5" />} label="Edit Personal Info" />
            <SettingsItem icon={<Briefcase className="w-5 h-5" />} label="Resume & Portfolio" />
            <div className="border-t">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-between p-4 text-destructive hover:bg-destructive/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function ProfileSection({ icon, title, content, children }: { icon: React.ReactNode; title: string; content?: string; children?: React.ReactNode }) {
  return (
    <Card className="border-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h3 className="font-bold">{title}</h3>
        </div>
        {children || (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content || "No information provided yet. Talk to Svype AI to update your goals."}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function SettingsItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-t first:border-t-0">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 opacity-50" />
    </button>
  )
}

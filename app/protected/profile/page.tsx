// app/protected/profile/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, LogOut, ChevronRight, Briefcase, Heart, Target, User, Mail, Award, Sparkles, TrendingUp, FileText, FileEdit } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { initializeMockData, getProfile, getApplications, type Profile } from "@/lib/mock-data"
import { TutorialOverlay, PROFILE_TUTORIAL } from "@/components/tutorial-overlay"
import { ProfileSkeleton } from "@/components/loading-skeletons"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [applicationCount, setApplicationCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    initializeMockData()
    const userProfile = getProfile()
    const apps = getApplications()
    setProfile(userProfile)
    setApplicationCount(apps.length)
    setLoading(false)
  }, [])

  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "See you soon!",
    })
    setTimeout(() => {
      router.push("/auth/login")
    }, 500)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-svh bg-gradient-to-b from-background to-muted/20 pb-20">
        <header className="p-4 border-b bg-background/95 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </header>
        <main className="p-4">
          <ProfileSkeleton />
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-svh bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon" onClick={() => router.push("/protected/settings")}>
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <main className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center py-4 sm:py-6">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-primary/20 shadow-lg">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
              {profile?.full_name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-center">{profile?.full_name}</h2>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            <p className="text-sm sm:text-base truncate max-w-[280px] sm:max-w-full">{profile?.email}</p>
          </div>
          <Badge variant="secondary" className="mt-3 bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary hover:from-primary/30 hover:to-blue-500/30 border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Career Matched
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">{applicationCount}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Applications</div>
            </CardContent>
          </Card>
          <Card className="border-2 bg-gradient-to-br from-blue-500/5 to-transparent">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 sm:p-3 bg-blue-500/10 rounded-full">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{profile?.interests.length || 0}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Interests</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Sections */}
        <div className="space-y-4">
          <ProfileSection
            icon={<Target className="w-5 h-5 text-primary" />}
            title="Career Goals"
            content={profile?.career_goals}
          />
          <ProfileSection icon={<Briefcase className="w-5 h-5 text-primary" />} title="Professional Interests">
            <div className="flex flex-wrap gap-2 mt-2">
              {profile?.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="hover:bg-primary/10 transition-colors">
                  {interest}
                </Badge>
              ))}
            </div>
          </ProfileSection>
          <ProfileSection
            icon={<Heart className="w-5 h-5 text-rose-500" />}
            title="Life Aspirations"
            content={profile?.life_goals}
          />
        </div>

        {/* Action Button */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">Update Your Goals</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Talk to AI to refine your career path</p>
              </div>
              <Button size="lg" className="gap-2 w-full sm:w-auto" onClick={() => router.push("/protected/chat")}>
                <Sparkles className="w-4 h-4" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SettingsItem icon={<FileText className="w-5 h-5 text-primary" />} label="Generate CV" onClick={() => router.push("/protected/generate-cv")} />
            <SettingsItem icon={<FileEdit className="w-5 h-5 text-primary" />} label="Generate Cover Letter" onClick={() => router.push("/protected/generate-cover-letter")} />
            <SettingsItem icon={<Award className="w-5 h-5 text-amber-500" />} label="Skills Assessment" onClick={() => router.push("/protected/skills-assessment")} />
            <SettingsItem icon={<Sparkles className="w-5 h-5 text-purple-500" />} label="Interview Preparation" onClick={() => router.push("/protected/interview-prep")} />
            <SettingsItem icon={<Briefcase className="w-5 h-5 text-blue-500" />} label="Saved Jobs" onClick={() => router.push("/protected/saved")} />
          </CardContent>
        </Card>

        <TutorialOverlay tutorialKey="profile" steps={PROFILE_TUTORIAL} />

        {/* Settings Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SettingsItem icon={<User className="w-5 h-5" />} label="Edit Personal Info" onClick={() => router.push("/protected/personal-info")} />
            <SettingsItem icon={<Briefcase className="w-5 h-5" />} label="Resume & Portfolio" onClick={() => router.push("/protected/resume")} />
            <SettingsItem icon={<Award className="w-5 h-5" />} label="Preferences" onClick={() => router.push("/protected/preferences")} />
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

interface ProfileSectionProps {
  icon: React.ReactNode
  title: string
  content?: string
  children?: React.ReactNode
}

function ProfileSection({ icon, title, content, children }: ProfileSectionProps) {
  return (
    <Card className="border-2 hover:border-primary/30 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        {children || (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content || "No information provided yet. Talk to the AI coach to update your goals."}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function SettingsItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-t first:border-t-0">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 opacity-50" />
    </button>
  )
}

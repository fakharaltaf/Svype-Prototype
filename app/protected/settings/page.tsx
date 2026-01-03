"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bell, Moon, Globe, Shield, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    jobRecommendations: true,
    darkMode: false,
    language: "English",
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    toast({
      title: "Setting updated",
      description: "Your preferences have been saved.",
    })
  }

  const handleClearData = () => {
    toast({
      title: "Data cleared",
      description: "Your local cache has been cleared successfully.",
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col min-h-svh bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Notifications */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates about your applications</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={() => handleToggle("notifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Alerts</Label>
                <p className="text-sm text-muted-foreground">Get job matches sent to your email</p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={() => handleToggle("emailAlerts")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Job Recommendations</Label>
                <p className="text-sm text-muted-foreground">Daily personalized job suggestions</p>
              </div>
              <Switch
                checked={settings.jobRecommendations}
                onCheckedChange={() => handleToggle("jobRecommendations")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={() => handleToggle("darkMode")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Data & Privacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-2 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive/10"
              onClick={handleClearData}
            >
              Clear Cache
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive/10"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pt-4 pb-8">
          <p>Talash v1.0.0</p>
          <p className="text-xs mt-1">© 2026 Talash. All rights reserved.</p>
        </div>
      </main>
    </div>
  )
}

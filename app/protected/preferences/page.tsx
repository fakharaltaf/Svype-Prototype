"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function PreferencesPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [preferences, setPreferences] = useState({
    remote: true,
    hybrid: true,
    onsite: false,
    fullTime: true,
    partTime: false,
    contract: false,
    salaryMin: 40,
    salaryMax: 100,
  })

  const [locations, setLocations] = useState(["London", "Manchester", "Remote"])
  const [jobTypes, setJobTypes] = useState(["Software Engineer", "Frontend Developer", "Full Stack Developer"])

  const handleSave = () => {
    toast({
      title: "Preferences saved",
      description: "Your job preferences have been updated successfully.",
    })
  }

  const removeItem = (arr: string[], setter: (val: string[]) => void, item: string) => {
    setter(arr.filter((i) => i !== item))
  }

  return (
    <div className="flex flex-col min-h-svh bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Job Preferences</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Work Location */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Work Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Remote</Label>
              <Switch
                checked={preferences.remote}
                onCheckedChange={(checked) => setPreferences({ ...preferences, remote: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Hybrid</Label>
              <Switch
                checked={preferences.hybrid}
                onCheckedChange={(checked) => setPreferences({ ...preferences, hybrid: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>On-site</Label>
              <Switch
                checked={preferences.onsite}
                onCheckedChange={(checked) => setPreferences({ ...preferences, onsite: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferred Locations */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Preferred Locations
              </CardTitle>
              <Button variant="ghost" size="sm">Add</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Badge key={location} variant="secondary" className="gap-1">
                  {location}
                  <button
                    onClick={() => removeItem(locations, setLocations, location)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employment Type */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Employment Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Full-time</Label>
              <Switch
                checked={preferences.fullTime}
                onCheckedChange={(checked) => setPreferences({ ...preferences, fullTime: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Part-time</Label>
              <Switch
                checked={preferences.partTime}
                onCheckedChange={(checked) => setPreferences({ ...preferences, partTime: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Contract</Label>
              <Switch
                checked={preferences.contract}
                onCheckedChange={(checked) => setPreferences({ ...preferences, contract: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Titles */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Desired Job Titles
              </CardTitle>
              <Button variant="ghost" size="sm">Add</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((job) => (
                <Badge key={job} variant="secondary" className="gap-1">
                  {job}
                  <button
                    onClick={() => removeItem(jobTypes, setJobTypes, job)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Salary Range */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Salary Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Minimum</Label>
                <span className="text-sm font-semibold">£{preferences.salaryMin}k</span>
              </div>
              <Slider
                value={[preferences.salaryMin]}
                onValueChange={([value]) => setPreferences({ ...preferences, salaryMin: value })}
                min={20}
                max={150}
                step={5}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Maximum</Label>
                <span className="text-sm font-semibold">£{preferences.salaryMax}k+</span>
              </div>
              <Slider
                value={[preferences.salaryMax]}
                onValueChange={([value]) => setPreferences({ ...preferences, salaryMax: value })}
                min={20}
                max={150}
                step={5}
              />
            </div>
            <div className="pt-2 text-center">
              <p className="text-sm text-muted-foreground">
                Preferred range: <span className="font-semibold text-foreground">£{preferences.salaryMin}k - £{preferences.salaryMax}k+</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="pb-4">
          <Button className="w-full" size="lg" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </main>
    </div>
  )
}

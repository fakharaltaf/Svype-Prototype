"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { SlidersHorizontal, MapPin, Briefcase, DollarSign, X } from "lucide-react"

interface FilterState {
  location: string
  jobType: string[]
  salaryMin: number
  salaryMax: number
  remote: boolean
  skills: string[]
}

interface FiltersSheetProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onReset: () => void
}

export function FiltersSheet({ filters, onFiltersChange, onReset }: FiltersSheetProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]
  const commonSkills = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "UI/UX", "Figma"]

  const toggleJobType = (type: string) => {
    const updated = localFilters.jobType.includes(type)
      ? localFilters.jobType.filter(t => t !== type)
      : [...localFilters.jobType, type]
    setLocalFilters({ ...localFilters, jobType: updated })
  }

  const toggleSkill = (skill: string) => {
    const updated = localFilters.skills.includes(skill)
      ? localFilters.skills.filter(s => s !== skill)
      : [...localFilters.skills, skill]
    setLocalFilters({ ...localFilters, skills: updated })
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
  }

  const handleReset = () => {
    const defaultFilters: FilterState = {
      location: "",
      jobType: [],
      salaryMin: 0,
      salaryMax: 150,
      remote: false,
      skills: []
    }
    setLocalFilters(defaultFilters)
    onReset()
  }

  const activeFiltersCount = 
    (localFilters.location ? 1 : 0) +
    localFilters.jobType.length +
    (localFilters.salaryMin > 0 || localFilters.salaryMax < 150 ? 1 : 0) +
    (localFilters.remote ? 1 : 0) +
    localFilters.skills.length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="ml-1 rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Customize your job search preferences
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              placeholder="e.g., London, Manchester, Remote"
              value={localFilters.location}
              onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
            />
          </div>

          {/* Remote Work */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              Remote Only
            </Label>
            <Switch
              checked={localFilters.remote}
              onCheckedChange={(checked) => setLocalFilters({ ...localFilters, remote: checked })}
            />
          </div>

          {/* Job Type */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Type
            </Label>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <Badge
                  key={type}
                  variant={localFilters.jobType.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleJobType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Salary Range (£k)
            </Label>
            <div className="px-2">
              <Slider
                min={0}
                max={150}
                step={5}
                value={[localFilters.salaryMin, localFilters.salaryMax]}
                onValueChange={([min, max]) => setLocalFilters({ ...localFilters, salaryMin: min, salaryMax: max })}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>£{localFilters.salaryMin}k</span>
                <span>£{localFilters.salaryMax}k{localFilters.salaryMax === 150 ? "+" : ""}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2">
              {commonSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={localFilters.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

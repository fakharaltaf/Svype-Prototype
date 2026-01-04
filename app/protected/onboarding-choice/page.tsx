// app/protected/onboarding-choice/page.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Sparkles, ArrowRight, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingChoicePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Talash! 🎉</h1>
          <p className="text-muted-foreground text-sm">
            Choose how you'd like to get started
          </p>
        </div>

        {/* Options - Horizontal Cards */}
        <div className="space-y-3">
          {/* Option 1: Upload CV */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <h2 className="text-xl font-bold">Upload Your CV</h2>
                  <p className="text-sm text-muted-foreground">
                    Quick and simple. Upload your resume and start swiping immediately.
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span className="text-xs text-muted-foreground">✓ Apply to multiple jobs</span>
                    <span className="text-xs text-muted-foreground">✓ Start right away</span>
                    <span className="text-xs text-primary font-medium">✓ Free forever</span>
                  </div>
                </div>

                <Button 
                  className="gap-2 flex-shrink-0"
                  onClick={() => router.push("/protected/upload-cv")}
                >
                  Upload <ArrowRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Option 2: AI-Powered Premium */}
          <Card className="border-2 border-primary/50 hover:border-primary transition-all hover:shadow-xl relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className="flex-1 space-y-1 pr-16">
                  <h2 className="text-xl font-bold">AI Career Assistant</h2>
                  <p className="text-sm text-muted-foreground">
                    Get personalized CVs and cover letters for every job you apply to.
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span className="text-xs text-muted-foreground">✓ Tailored applications</span>
                    <span className="text-xs text-muted-foreground">✓ Custom cover letters</span>
                    <span className="text-xs text-muted-foreground">✓ AI coaching</span>
                    <span className="text-xs text-primary font-medium">✓ 3x success rate</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    7-day free trial, then £9.99/month
                  </p>
                </div>

                <Button 
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 flex-shrink-0"
                  onClick={() => router.push("/protected/premium-onboarding")}
                >
                  Start <Sparkles size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skip Option */}
        <div className="text-center pt-2">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => router.push("/protected/swipe")}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  )
}

// app/welcome/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Briefcase, Sparkles, TrendingUp, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-primary/20">
            <Briefcase className="w-12 h-12 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            SVYPE
          </h1>
        </div>

        {/* Value Proposition */}
        <div className="max-w-md mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Your AI-Powered Job Hunt
          </h2>
          <p className="text-muted-foreground text-lg">
            Swipe through opportunities, get matched with your dream job, and let AI help you succeed.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 max-w-md mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Quick Apply</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">AI Matching</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Career Growth</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <Button 
          size="lg" 
          className="w-full"
          onClick={() => router.push("/")}
        >
          Get Started
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full"
          onClick={() => router.push("/auth/login")}
        >
          I Already Have an Account
        </Button>
        <button
          onClick={() => router.push("/protected/swipe")}
          className="w-full text-center text-sm text-muted-foreground py-2 hover:text-foreground transition-colors"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-svh bg-background items-center justify-center p-4">
      <Card className="w-full max-w-lg border-2">
        <CardHeader>
          <CardTitle className="text-2xl text-center">AI Career Coach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            The AI-powered career coaching feature is not available in this prototype.
          </p>
          <p className="text-center text-muted-foreground text-sm">
            This would normally help you define your career goals and personalize your job search.
          </p>
          <Button 
            onClick={() => router.push("/protected/swipe")} 
            className="w-full h-12 text-lg font-bold"
          >
            Continue to App
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

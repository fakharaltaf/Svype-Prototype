// app/auth/sign-up-success/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/30">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6 text-center mb-8">
          <h1 className="text-4xl font-black text-primary tracking-tighter">SVYPE</h1>
        </div>
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl">Welcome to SVYPE!</CardTitle>
            <CardDescription>
              Your account has been created. Let's build your profile with our AI assistant.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild className="w-full h-12 text-lg font-bold">
              <Link href="/protected/onboarding">Start AI Onboarding</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/protected/swipe")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

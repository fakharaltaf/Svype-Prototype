// app/auth/sign-up/page.tsx
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // For prototype: Accept any credentials and go to AI onboarding
    router.push("/auth/sign-up-success")
  }

  const handleOAuthSignUp = (provider: string) => {
    // For prototype: Simulate OAuth and go directly to AI onboarding
    console.log(`OAuth sign up with ${provider}`)
    router.push("/auth/sign-up-success")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/30">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6 text-center mb-8">
          <h1 className="text-4xl font-black text-primary tracking-tighter">SVYPE</h1>
          <p className="text-muted-foreground">Join thousands finding their dream jobs.</p>
        </div>
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Get started with your dream career</CardDescription>
          </CardHeader>
          <CardContent>
            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignUp('linkedin')}
                className="h-11"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignUp('github')}
                className="h-11"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="relative mb-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                Or continue with email
              </span>
            </div>

            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 border-2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-2"
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 border-2"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the{" "}
                    <Link href="/terms" className="underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="underline">Privacy Policy</Link>
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-bold"
                  disabled={!agreedToTerms}
                >
                  Sign Up
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4 text-primary font-semibold">
                  Login
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t text-center text-sm">
                <Link href="/auth/company-sign-up" className="text-muted-foreground hover:text-foreground">
                  Register as a company instead →
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

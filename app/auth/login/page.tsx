// app/auth/login/page.tsx
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // For prototype: Accept any credentials and go directly to swipe page
    router.push("/protected/swipe")
  }

  const handleOAuthLogin = (provider: string) => {
    // For prototype: Simulate OAuth login
    console.log(`OAuth login with ${provider}`)
    router.push("/protected/swipe")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/30">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6 text-center mb-8">
          <h1 className="text-4xl font-black text-primary tracking-tighter">SVYPE</h1>
          <p className="text-muted-foreground">Find your next career move, one swipe at a time.</p>
        </div>
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('linkedin')}
                className="h-11"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('github')}
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

            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/auth/forgot-password" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-2"
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/sign-up" className="underline underline-offset-4 text-primary font-semibold">
                  Sign up
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t text-center text-sm">
                <Link href="/auth/company-login" className="text-muted-foreground hover:text-foreground">
                  Are you a company? Login here →
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

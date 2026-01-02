import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function Page() {
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
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a confirmation link to your email address. Please click it to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild className="w-full h-12 text-lg font-bold">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or try signing up again.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

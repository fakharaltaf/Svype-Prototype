import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Zap, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
              <Zap size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance">Svype</h1>
          <p className="text-muted-foreground text-lg text-pretty">
            Find your dream job with a single swipe. AI-powered career coaching and interactive job hunting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Link href="/auth/sign-up" className="w-full">
            <Button size="lg" className="w-full text-lg h-14 rounded-xl gap-2">
              Get Started <ArrowRight size={20} />
            </Button>
          </Link>
          <Link href="/auth/login" className="w-full">
            <Button variant="outline" size="lg" className="w-full text-lg h-14 rounded-xl bg-transparent">
              Log In
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-8 border-t">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="p-2 bg-secondary rounded-full">
              <Briefcase size={16} />
            </div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Jobs</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="p-2 bg-secondary rounded-full">
              <MessageSquare size={16} />
            </div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">AI Coach</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="p-2 bg-secondary rounded-full">
              <Zap size={16} />
            </div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Swipe</span>
          </div>
        </div>
      </div>
    </main>
  )
}

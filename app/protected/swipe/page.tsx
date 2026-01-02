"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Undo2, X, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { initializeMockData, getAvailableJobs, applyToJob, discardJob, undoDiscard, type Job } from "@/lib/mock-data"

export default function SwipePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [undoItem, setUndoItem] = useState<{ jobId: string; timer: NodeJS.Timeout } | null>(null)
  const [showUndo, setShowUndo] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const fetchJobs = useCallback(() => {
    setLoading(true)
    // Initialize mock data on first load
    initializeMockData()
    // Get available jobs from mock data
    const availableJobs = getAvailableJobs()
    setJobs(availableJobs)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleApply = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId)
    if (!job) return

    applyToJob(job)
    toast({ title: "Applied!", description: "Check your dashboard for updates." })
    setJobs((prev) => prev.filter((j) => j.id !== jobId))
  }

  const handleDiscard = (jobId: string) => {
    discardJob(jobId)

    // Set up undo
    if (undoItem) clearTimeout(undoItem.timer)

    const timer = setTimeout(() => {
      setShowUndo(false)
      setUndoItem(null)
    }, 5000)

    setUndoItem({ jobId, timer })
    setShowUndo(true)
    setJobs((prev) => prev.filter((j) => j.id !== jobId))
  }

  const handleUndo = () => {
    if (!undoItem) return
    clearTimeout(undoItem.timer)

    undoDiscard(undoItem.jobId)

    // Re-fetch to put it back
    fetchJobs()
    setShowUndo(false)
    setUndoItem(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col h-svh bg-background overflow-hidden">
        <header className="p-4 border-b flex items-center justify-between z-10 bg-background">
          <h1 className="text-2xl font-bold text-primary">Svype</h1>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-[350px] aspect-[3/4]">
            <Card className="w-full h-full overflow-hidden shadow-xl border-2 animate-pulse">
              <CardContent className="p-0 h-full relative bg-muted" />
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-svh bg-background overflow-hidden relative">
      <header className="p-4 border-b flex items-center justify-between z-10 bg-background">
        <h1 className="text-2xl font-bold text-primary">Svype</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/protected/dashboard")}>
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-[1.2rem]">3</Badge>
            <DollarSign className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 relative flex items-center justify-center p-4">
        <AnimatePresence>
          {jobs.length > 0 ? (
            jobs
              .slice(0, 2)
              .reverse()
              .map((job, index) => (
                <SwipeCard
                  key={job.id}
                  job={job}
                  onSwipeRight={() => handleApply(job.id)}
                  onSwipeLeft={() => handleDiscard(job.id)}
                  isTop={index === 1 || jobs.length === 1}
                />
              ))
          ) : (
            <div className="text-center p-8">
              <h2 className="text-xl font-semibold mb-2">No more jobs!</h2>
              <p className="text-muted-foreground mb-4">You've seen everything for today.</p>
              <Button onClick={fetchJobs}>Refresh</Button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Undo Popup */}
      <AnimatePresence>
        {showUndo && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          >
            <Button
              onClick={handleUndo}
              className="bg-primary text-primary-foreground shadow-lg rounded-full px-6 flex gap-2 items-center"
            >
              <Undo2 className="w-4 h-4" />
              Undo Discard (5s)
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-6 flex justify-center gap-8 z-10 bg-background border-t">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-14 h-14 border-destructive text-destructive hover:bg-destructive hover:text-white bg-transparent"
          onClick={() => jobs[0] && handleDiscard(jobs[0].id)}
        >
          <X className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-14 h-14 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          onClick={() => jobs[0] && handleApply(jobs[0].id)}
        >
          <Heart className="w-6 h-6" />
        </Button>
      </footer>
    </div>
  )
}

function SwipeCard({
  job,
  onSwipeRight,
  onSwipeLeft,
  isTop,
}: {
  job: Job
  onSwipeRight: () => void
  onSwipeLeft: () => void
  isTop: boolean
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])
  const likeOpacity = useTransform(x, [50, 150], [0, 1])
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1])

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipeRight()
    } else if (info.offset.x < -100) {
      onSwipeLeft()
    }
  }

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute w-full max-w-[350px] aspect-[3/4]"
    >
      <Card className="w-full h-full overflow-hidden shadow-xl border-2">
        <CardContent className="p-0 h-full relative">
          <Image
            src={`https://api.dicebear.com/7.x/shapes/svg?seed=${job.id}`}
            alt={job.company}
            fill
            className="object-cover"
          />

          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-10 left-10 border-4 border-primary text-primary font-black text-4xl px-4 py-2 rounded-xl rotate-[-20deg] uppercase"
          >
            Apply
          </motion.div>

          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-10 right-10 border-4 border-destructive text-destructive font-black text-4xl px-4 py-2 rounded-xl rotate-[20deg] uppercase"
          >
            Pass
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-lg opacity-90">{job.company}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="flex gap-1 items-center bg-white/20 hover:bg-white/30 text-white">
                <MapPin className="w-3 h-3" /> {job.location}
              </Badge>
              <Badge variant="secondary" className="flex gap-1 items-center bg-white/20 hover:bg-white/30 text-white">
                <DollarSign className="w-3 h-3" /> £{job.salary_min.toLocaleString()} - £{job.salary_max.toLocaleString()}
              </Badge>
            </div>
            <p className="mt-3 text-sm line-clamp-2 opacity-80">{job.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

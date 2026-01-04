// app/protected/reset/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { resetMockData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export default function ResetPage() {
  const router = useRouter()

  const handleReset = () => {
    resetMockData()
    router.push("/protected/swipe")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold">Reset Jobs Data</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This will reset all job applications, discarded jobs, and restore the original job list.
      </p>
      <div className="flex gap-4">
        <Button onClick={handleReset} variant="destructive">
          Reset Data
        </Button>
        <Button onClick={() => router.back()} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  )
}

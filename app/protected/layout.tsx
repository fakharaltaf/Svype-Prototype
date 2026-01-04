// app/protected/layout.tsx
import { BottomNav } from "@/components/bottom-nav"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pb-16 ">
        {children}
      </div>
      <BottomNav />
    </>
  )
}

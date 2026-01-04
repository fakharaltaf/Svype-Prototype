// app/company/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Company Portal - SVYPE",
  description: "Manage your company job postings and review applicants",
}

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

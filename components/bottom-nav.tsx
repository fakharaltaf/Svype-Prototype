"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Briefcase, User, LayoutDashboard, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { 
      icon: Briefcase, 
      label: "Swipe", 
      href: "/protected/swipe" 
    },
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      href: "/protected/dashboard" 
    },
    { 
      icon: MessageCircle, 
      label: "Chat", 
      href: "/protected/chat" 
    },
    { 
      icon: User, 
      label: "Profile", 
      href: "/protected/profile" 
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200",
                "hover:bg-muted/50 rounded-lg",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn(
                "transition-all duration-200",
                isActive ? "w-6 h-6" : "w-5 h-5"
              )} />
              <span className={cn(
                "text-xs font-medium transition-all duration-200",
                isActive ? "font-semibold" : ""
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

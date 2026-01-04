// app/protected/notifications/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle2, Clock, Calendar, Briefcase, TrendingUp, X, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: "application" | "interview" | "status" | "tip" | "message"
  title: string
  description: string
  time: string
  read: boolean
  actionUrl?: string
}

export default function NotificationsPage() {
  const router = useRouter()
  const [swipedItem, setSwipedItem] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "status",
      title: "Application Status Update",
      description: "Your application for Senior Frontend Engineer at TechCorp has been shortlisted!",
      time: "2 hours ago",
      read: false,
      actionUrl: "/protected/dashboard"
    },
    {
      id: "2",
      type: "interview",
      title: "Interview Scheduled",
      description: "Interview for Product Designer at Design Studio scheduled for Jan 5, 2:00 PM",
      time: "5 hours ago",
      read: false,
      actionUrl: "/protected/dashboard"
    },
    {
      id: "3",
      type: "tip",
      title: "Career Tip",
      description: "Update your profile with your latest projects to attract more opportunities",
      time: "1 day ago",
      read: true,
      actionUrl: "/protected/profile"
    },
    {
      id: "4",
      type: "application",
      title: "New Job Match",
      description: "3 new jobs matching your preferences are available",
      time: "1 day ago",
      read: true,
      actionUrl: "/protected/swipe"
    },
    {
      id: "5",
      type: "message",
      title: "Message from TechCorp",
      description: "The hiring manager would like to know more about your React experience",
      time: "2 days ago",
      read: true,
      actionUrl: "/protected/chat"
    },
    {
      id: "6",
      type: "status",
      title: "Application Submitted",
      description: "Your application for Backend Developer at DataSystems has been received",
      time: "3 days ago",
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="w-5 h-5 text-blue-500" />
      case "interview":
        return <Calendar className="w-5 h-5 text-amber-500" />
      case "status":
        return <TrendingUp className="w-5 h-5 text-green-500" />
      case "tip":
        return <CheckCircle2 className="w-5 h-5 text-purple-500" />
      case "message":
        return <Bell className="w-5 h-5 text-primary" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
  }

  const NotificationCard = ({ notification }: { notification: Notification }) => {
    const swipeHandlers = useSwipeable({
      onSwipedLeft: () => setSwipedItem(notification.id),
      onSwipedRight: () => setSwipedItem(null),
      trackMouse: true,
      preventScrollOnSwipe: true,
    })

    return (
      <div className="relative">
        {/* Delete button revealed on swipe */}
        {swipedItem === notification.id && (
          <div className="absolute inset-0 bg-destructive flex items-center justify-end pr-6 rounded-lg">
            <X className="w-6 h-6 text-destructive-foreground" />
          </div>
        )}
        
        <div
          {...swipeHandlers}
          className={`transition-transform duration-200 ${swipedItem === notification.id ? '-translate-x-20' : ''}`}
        >
          <Card 
            className={`border-2 transition-all ${
              !notification.read 
                ? "bg-primary/5 border-primary/20 hover:border-primary/50" 
                : "hover:border-primary/30"
            }`}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex gap-2 sm:gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div 
                  className="flex-1 cursor-pointer min-w-0" 
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between mb-1 gap-2">
                    <h3 className={`font-semibold text-sm sm:text-base ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5"></div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    {notification.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {notification.time}
                    </div>
                    {notification.actionUrl && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 sm:h-7 text-[10px] sm:text-xs self-start sm:self-auto"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNotificationClick(notification)
                        }}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNotification(notification.id)
                  }}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative flex-shrink-0">
              <Bell className="w-5 h-5 text-primary" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">{unreadCount}</span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold">Notifications</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs sm:text-sm h-8">
                <span className="hidden sm:inline">Mark all read</span>
                <span className="sm:hidden">Mark read</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 sm:hidden">← Swipe left to delete</p>
      </header>

      {/* Notifications List */}
      <div className="flex-1 px-4 sm:px-6 py-4 space-y-2 sm:space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="text-center py-16 sm:py-20">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Notifications</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              You're all caught up! We'll notify you about important updates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

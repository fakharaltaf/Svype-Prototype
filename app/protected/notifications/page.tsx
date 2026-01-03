"use client"

import { useState, useEffect } from "react"
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-primary" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">{unreadCount}</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <div className="flex-1 p-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`border-2 transition-all ${
                !notification.read 
                  ? "bg-primary/5 border-primary/20 hover:border-primary/50" 
                  : "hover:border-primary/30"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2 mt-1.5"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                      {notification.actionUrl && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
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
                    className="flex-shrink-0 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! We'll notify you about important updates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

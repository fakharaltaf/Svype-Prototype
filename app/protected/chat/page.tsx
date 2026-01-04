// app/protected/chat/page.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, User, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Career Coach. I'm here to help you discover your ideal career path, refine your goals, and find jobs that truly match your aspirations. How can I assist you today?",
    timestamp: new Date(Date.now() - 5000),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response with hardcoded data
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your interests in web development and UI/UX design, I'd recommend focusing on roles that combine technical skills with creative problem-solving. Have you considered positions like Frontend Developer or Product Designer?",
        "I can see you're passionate about making an impact. Jobs that align with your values tend to lead to greater job satisfaction. What aspects of a role are most important to you - the company culture, the projects, or the growth opportunities?",
        "Your career goals are clear and ambitious! To get there, I'd suggest building skills in React, TypeScript, and modern design systems. Would you like me to help you find jobs that match these requirements?",
        "That's an excellent point! Work-life balance is crucial for long-term career success. I'll keep that in mind when suggesting opportunities. Are there specific work arrangements you prefer, like remote work or flexible hours?",
        "I understand. Let me help you explore that further. What excites you most about this career direction? Understanding your motivations will help me provide better recommendations.",
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickPrompts = [
    "Help me define my career goals",
    "What jobs match my skills?",
    "How can I improve my resume?",
    "Tips for job interviews",
  ]

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <Avatar className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500">
                <AvatarFallback className="bg-transparent text-white">
                  <Sparkles className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold">AI Career Coach</h1>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
            <Sparkles className="w-3 h-3" />
            AI
          </Badge>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <Avatar
              className={`w-8 h-8 flex-shrink-0 ${
                message.role === "assistant"
                  ? "bg-gradient-to-br from-primary to-blue-500"
                  : "bg-muted"
              }`}
            >
              <AvatarFallback className={message.role === "assistant" ? "bg-transparent text-white" : ""}>
                {message.role === "assistant" ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>

            <div
              className={`flex flex-col max-w-[80%] ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <Card
                className={`p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-2"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </Card>
              <span className="text-xs text-muted-foreground mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-primary to-blue-500">
              <AvatarFallback className="bg-transparent text-white">
                <Sparkles className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <Card className="p-4 border-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-3">Quick prompts to get started:</p>
          <div className="flex flex-wrap gap-2 mb-24">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt)}
                className="text-xs"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t z-10">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career..."
            className="min-h-[52px] max-h-32 resize-none"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="h-[52px] w-[52px] flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

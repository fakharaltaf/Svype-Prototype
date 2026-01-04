// app/protected/premium-onboarding/page.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Send, ChevronLeft, Crown, User, Bot } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function PremiumOnboardingPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI Career Assistant. 🎯 I'll help you create the perfect CV and cover letters tailored to each job you apply to. Let's start by getting to know you better. What's your current role or the role you're looking for?"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI responses based on conversation flow
    setTimeout(() => {
      let aiResponse = ""
      
      if (step === 1) {
        aiResponse = "Great! Tell me about your key skills and experience in this area. What makes you stand out?"
        setStep(2)
      } else if (step === 2) {
        aiResponse = "Excellent! Now, what are your biggest career achievements? Any projects, metrics, or results you're proud of?"
        setStep(3)
      } else if (step === 3) {
        aiResponse = "Perfect! Finally, what's your ideal work environment and what are you looking for in your next role?"
        setStep(4)
      } else if (step === 4) {
        aiResponse = "Amazing! 🎉 I've created your personalized profile. Now, whenever you apply to a job, I'll automatically generate a custom CV and cover letter tailored to that specific position. You're all set to start swiping!"
        setStep(5)
      } else {
        aiResponse = "Feel free to update your information anytime. Let's get you started with job hunting!"
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleFinish = () => {
    router.push("/protected/swipe")
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </Button>

        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <Card className={`max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : ""}`}>
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </CardContent>
              </Card>

              {message.role === "user" && (
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <Card>
                <CardContent className="p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <div className="max-w-3xl mx-auto">
          {step === 5 ? (
            <Button
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80"
              onClick={handleFinish}
            >
              Start Job Hunting <Sparkles size={20} />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your answer..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
              >
                <Send size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

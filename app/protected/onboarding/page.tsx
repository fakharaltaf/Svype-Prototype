// app/protected/onboarding/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bot, User, Send, Sparkles, ArrowRight } from "lucide-react"

interface Message {
  id: number
  type: "bot" | "user"
  content: string
}

interface Step {
  question: string
  placeholder: string
  options?: string[]
}

const onboardingSteps: Step[] = [
  {
    question: "Great to meet you! What kind of role are you looking for?",
    placeholder: "e.g., Software Developer, Product Manager...",
  },
  {
    question: "What are your key skills or areas of expertise?",
    placeholder: "e.g., React, Python, Project Management...",
  },
  {
    question: "How many years of experience do you have?",
    placeholder: "e.g., 3 years, Entry level...",
    options: ["Entry level (0-2 years)", "Mid-level (3-5 years)", "Senior (5+ years)", "Lead/Management"]
  },
  {
    question: "What's your preferred work setup?",
    placeholder: "Select your preference",
    options: ["Remote", "Hybrid", "On-site", "Flexible"]
  },
  {
    question: "What's your expected salary range?",
    placeholder: "e.g., £40k - £60k",
  },
  {
    question: "Which locations are you interested in?",
    placeholder: "e.g., London, Manchester, Remote",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: "bot",
      content: "Hi! I'm your AI career assistant. I'll help you build your profile so we can find the perfect job opportunities for you. Ready? Let's start!"
    },
    {
      id: 1,
      type: "bot",
      content: onboardingSteps[0].question
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  const handleSend = async (answer?: string) => {
    const userAnswer = answer || input.trim()
    if (!userAnswer) return

    // Add user message
    const userMessage: Message = {
      id: messages.length,
      type: "user",
      content: userAnswer
    }
    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000))

    const nextStep = currentStep + 1
    
    if (nextStep < onboardingSteps.length) {
      // Add next question
      const botMessage: Message = {
        id: messages.length + 1,
        type: "bot",
        content: onboardingSteps[nextStep].question
      }
      setMessages(prev => [...prev, botMessage])
      setCurrentStep(nextStep)
    } else {
      // Onboarding complete
      const completionMessage: Message = {
        id: messages.length + 1,
        type: "bot",
        content: "Perfect! I've created your profile. Let me import some additional data to enhance it even more..."
      }
      setMessages(prev => [...prev, completionMessage])
      
      // Navigate to import screen after delay
      setTimeout(() => {
        router.push("/protected/import-data")
      }, 2000)
    }
    
    setIsTyping(false)
  }

  const handleSkip = () => {
    router.push("/protected/import-data")
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-background border-b p-4 flex-shrink-0 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">AI Career Assistant</h2>
                <p className="text-xs text-muted-foreground">Building your profile</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 pb-48">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "bot" 
                  ? "bg-gradient-to-br from-primary to-primary/60" 
                  : "bg-muted"
              }`}>
                {message.type === "bot" ? (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className={`flex-1 ${message.type === "user" ? "flex justify-end" : ""}`}>
                <div className={`inline-block max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === "bot"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-background border-t p-4 pb-20 flex-shrink-0 fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-2xl mx-auto">
          {/* Quick Options */}
          {currentStepData.options && (
            <div className="flex flex-wrap gap-2 mb-3">
              {currentStepData.options.map((option, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSend(option)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          )}

          {/* Text Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={currentStepData.placeholder}
              disabled={isTyping}
              className="flex-1"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              size="icon"
              className="flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// app/protected/pre-screening-quiz/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Award,
  AlertCircle
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const mockQuiz: Question[] = [
  {
    id: 1,
    question: "What is React primarily used for?",
    options: [
      "Building backend APIs",
      "Building user interfaces",
      "Database management",
      "Server configuration"
    ],
    correctAnswer: 1,
    explanation: "React is a JavaScript library for building user interfaces, particularly for single-page applications."
  },
  {
    id: 2,
    question: "Which hook is used for side effects in React?",
    options: [
      "useState",
      "useContext",
      "useEffect",
      "useCallback"
    ],
    correctAnswer: 2,
    explanation: "useEffect is the hook used to handle side effects like data fetching, subscriptions, and manually changing the DOM."
  },
  {
    id: 3,
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "Java Syntax Extension",
      "JavaScript Express"
    ],
    correctAnswer: 0,
    explanation: "JSX stands for JavaScript XML. It allows us to write HTML-like syntax in JavaScript."
  },
  {
    id: 4,
    question: "What is the virtual DOM?",
    options: [
      "A backup of the real DOM",
      "A lightweight copy of the real DOM",
      "A database for DOM elements",
      "A CSS framework"
    ],
    correctAnswer: 1,
    explanation: "The virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates and improve performance."
  },
  {
    id: 5,
    question: "Which method is used to update state in a functional component?",
    options: [
      "this.setState()",
      "setState()",
      "The setter function from useState",
      "updateState()"
    ],
    correctAnswer: 2,
    explanation: "In functional components, we use the setter function returned by the useState hook to update state."
  }
]

export default function PreScreeningQuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const applicationId = searchParams.get('applicationId')

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(mockQuiz.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Timer
  useEffect(() => {
    if (showResult) return
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showResult])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
    }

    if (currentQuestion < mockQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setShowResult(true)
    setIsSubmitting(false)
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === mockQuiz[index].correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: mockQuiz.length,
      percentage: Math.round((correct / mockQuiz.length) * 100)
    }
  }

  const score = showResult ? calculateScore() : null

  if (showResult && score) {
    const passed = score.percentage >= 60

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8">
          {/* Result Header */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              passed ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
            }`}>
              {passed ? (
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {passed ? "Quiz Completed!" : "Quiz Submitted"}
            </h1>
            <p className="text-muted-foreground">
              {passed 
                ? "Great job! You've passed the pre-screening quiz." 
                : "Thank you for completing the quiz. The employer will review your application."}
            </p>
          </div>

          {/* Score Card */}
          <Card className="p-6 mb-6 bg-muted/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Your Score</span>
              <Badge variant={passed ? "default" : "secondary"} className="text-lg px-3 py-1">
                {score.percentage}%
              </Badge>
            </div>
            <Progress value={score.percentage} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              {score.correct} out of {score.total} questions correct
            </p>
          </Card>

          {/* Questions Review */}
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            {mockQuiz.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.correctAnswer
              
              return (
                <Card key={question.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect 
                        ? "bg-green-100 dark:bg-green-900/20" 
                        : "bg-red-100 dark:bg-red-900/20"
                    }`}>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">Question {index + 1}: {question.question}</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Your answer: {userAnswer !== null ? question.options[userAnswer] : "Not answered"}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/protected/dashboard")}
            >
              View Applications
            </Button>
            <Button
              className="flex-1"
              onClick={() => router.push("/protected/swipe")}
            >
              Continue Swiping
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const currentQ = mockQuiz[currentQuestion]
  const progress = ((currentQuestion + 1) / mockQuiz.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold">Pre-Screening Quiz</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {mockQuiz.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className={`font-mono font-semibold ${
                timeLeft < 60 ? "text-red-500" : ""
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <Progress value={progress} className="mt-3 h-2" />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Card className="p-8">
          {/* Question */}
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              Question {currentQuestion + 1}
            </Badge>
            <h2 className="text-2xl font-semibold mb-2">{currentQ.question}</h2>
            <p className="text-sm text-muted-foreground">Select one answer</p>
          </div>

          {/* Options */}
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedAnswer === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer text-base"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Warning for unanswered */}
          {selectedAnswer === null && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Please select an answer before proceeding to the next question.
              </p>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-1">
            {mockQuiz.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion
                    ? "bg-primary w-4"
                    : answers[index] !== null
                    ? "bg-primary/50"
                    : "bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>

          {currentQuestion === mockQuiz.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Quiz
                  <Award className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null || isSubmitting}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

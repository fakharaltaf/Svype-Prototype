"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, CheckCircle2, Award, TrendingUp, Target } from "lucide-react"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function SkillsAssessmentPage() {
  const router = useRouter()
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [assessmentComplete, setAssessmentComplete] = useState(false)

  const skills = [
    { 
      id: "react", 
      name: "React", 
      icon: "⚛️",
      description: "Test your knowledge of React fundamentals",
      questions: 10,
      duration: "15 min"
    },
    { 
      id: "typescript", 
      name: "TypeScript", 
      icon: "📘",
      description: "Assess your TypeScript skills",
      questions: 10,
      duration: "15 min"
    },
    { 
      id: "nodejs", 
      name: "Node.js", 
      icon: "🟢",
      description: "Evaluate your backend knowledge",
      questions: 10,
      duration: "15 min"
    },
    { 
      id: "javascript", 
      name: "JavaScript", 
      icon: "🟨",
      description: "Test core JavaScript concepts",
      questions: 10,
      duration: "15 min"
    },
  ]

  const assessments: Record<string, Question[]> = {
    react: [
      {
        id: "1",
        question: "What is the purpose of useEffect hook in React?",
        options: [
          "To manage component state",
          "To perform side effects in function components",
          "To create context",
          "To optimize performance"
        ],
        correctAnswer: 1,
        explanation: "useEffect is used to perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM."
      },
      {
        id: "2",
        question: "Which method is used to update state in a class component?",
        options: [
          "updateState()",
          "setState()",
          "changeState()",
          "modifyState()"
        ],
        correctAnswer: 1,
        explanation: "setState() is the method used to update state in React class components."
      },
      {
        id: "3",
        question: "What is JSX?",
        options: [
          "A programming language",
          "A syntax extension for JavaScript",
          "A CSS framework",
          "A testing library"
        ],
        correctAnswer: 1,
        explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
      },
    ],
    typescript: [
      {
        id: "1",
        question: "What is TypeScript?",
        options: [
          "A JavaScript runtime",
          "A superset of JavaScript with static typing",
          "A CSS preprocessor",
          "A testing framework"
        ],
        correctAnswer: 1,
        explanation: "TypeScript is a superset of JavaScript that adds static typing and other features to help catch errors during development."
      },
      {
        id: "2",
        question: "Which keyword is used to define an interface in TypeScript?",
        options: [
          "class",
          "type",
          "interface",
          "define"
        ],
        correctAnswer: 2,
        explanation: "The 'interface' keyword is used to define an interface in TypeScript, which describes the shape of an object."
      },
    ],
  }

  const currentAssessment = selectedSkill ? assessments[selectedSkill] || [] : []
  const currentQuestion = currentAssessment[currentQuestionIndex]

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkill(skillId)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setShowExplanation(false)
    setAssessmentComplete(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentAssessment.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setAssessmentComplete(true)
    }
  }

  const getScorePercentage = () => {
    return Math.round((score / currentAssessment.length) * 100)
  }

  const getScoreLevel = () => {
    const percentage = getScorePercentage()
    if (percentage >= 80) return { level: "Expert", color: "text-green-600", badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" }
    if (percentage >= 60) return { level: "Intermediate", color: "text-blue-600", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" }
    return { level: "Beginner", color: "text-amber-600", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" }
  }

  if (!selectedSkill) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
        <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Skills Assessment</h1>
              <p className="text-sm text-muted-foreground">Test your knowledge</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 space-y-4 max-w-4xl mx-auto w-full">
          <Card className="border-2 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Validate Your Skills</h2>
                  <p className="text-muted-foreground">
                    Take quick assessments to showcase your expertise and stand out to employers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-bold">Choose a Skill to Assess</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <Card 
                key={skill.id}
                className="border-2 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg"
                onClick={() => handleSkillSelect(skill.id)}
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span>📝 {skill.questions} questions</span>
                    <span>⏱️ {skill.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">Benefits of Skills Assessment</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Showcase Your Expertise</p>
                    <p className="text-sm text-muted-foreground">Add verified skill badges to your profile</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Stand Out to Employers</p>
                    <p className="text-sm text-muted-foreground">Increase your visibility in job searches</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Identify Growth Areas</p>
                    <p className="text-sm text-muted-foreground">Get personalized recommendations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (assessmentComplete) {
    const scoreLevel = getScoreLevel()
    const percentage = getScorePercentage()

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
        <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedSkill(null)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Assessment Complete</h1>
          </div>
        </header>

        <div className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full flex items-center justify-center">
          <Card className="border-2 w-full">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>

              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
              <p className="text-muted-foreground mb-6">
                You've completed the {skills.find(s => s.id === selectedSkill)?.name} assessment
              </p>

              <div className="mb-6">
                <div className="text-5xl font-bold mb-2 text-primary">{percentage}%</div>
                <Badge className={scoreLevel.badge}>
                  {scoreLevel.level} Level
                </Badge>
              </div>

              <div className="text-left mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Your Score</p>
                <p className="text-2xl font-bold mb-2">{score} / {currentAssessment.length}</p>
                <Progress value={percentage} className="h-2" />
              </div>

              <div className="space-y-3 text-left mb-6">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Badge Added</p>
                    <p className="text-sm text-muted-foreground">Your skill badge is now visible on your profile</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedSkill(null)} className="flex-1">
                  Take Another
                </Button>
                <Button onClick={() => router.push('/protected/profile')} className="flex-1">
                  View Profile
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
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedSkill(null)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{skills.find(s => s.id === selectedSkill)?.name} Assessment</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {currentAssessment.length}
              </p>
            </div>
          </div>
          <Badge variant="secondary">
            Score: {score}/{currentAssessment.length}
          </Badge>
        </div>
        <Progress value={((currentQuestionIndex + 1) / currentAssessment.length) * 100} className="mt-3" />
      </header>

      <div className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full">
        <Card className="border-2">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                      showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                          : selectedAnswer === index
                          ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                          : "border-border"
                        : selectedAnswer === index
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showExplanation} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                    {showExplanation && index === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>

            {showExplanation && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">Explanation:</p>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {!showExplanation ? (
          <Button 
            size="lg" 
            className="w-full" 
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={handleNextQuestion}>
            {currentQuestionIndex < currentAssessment.length - 1 ? "Next Question" : "Finish Assessment"}
          </Button>
        )}
      </div>
    </div>
  )
}

// app/company/add-quiz-questions/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Save, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  type: "multiple-choice" | "text"
  question: string
  options?: string[]
  correctAnswer?: number
  points: number
}

export default function AddQuizQuestionsPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: Date.now().toString(),
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 10
  })

  const handleAddQuestion = () => {
    if (currentQuestion.question.trim()) {
      setQuestions([...questions, { ...currentQuestion, id: Date.now().toString() }])
      setCurrentQuestion({
        id: Date.now().toString(),
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 10
      })
    }
  }

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])]
    newOptions[index] = value
    setCurrentQuestion({ ...currentQuestion, options: newOptions })
  }

  const handleSave = () => {
    console.log("Saving quiz with questions:", questions)
    router.back()
  }

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-24">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Add Quiz Questions</h1>
              <p className="text-sm text-muted-foreground">Create a custom pre-screening quiz</p>
            </div>
            <Badge variant="secondary">
              {questions.length} {questions.length === 1 ? "question" : "questions"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Info Banner */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Quiz Best Practices
              </p>
              <ul className="text-xs text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                <li>• Keep questions relevant to the job requirements</li>
                <li>• Aim for 5-10 questions for optimal completion rate</li>
                <li>• Mix difficulty levels to better assess candidates</li>
                <li>• Set passing score at 60-70% for fair evaluation</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Question Builder */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Create New Question</h2>
          
          <div className="space-y-6">
            {/* Question Type */}
            <div>
              <Label htmlFor="questionType">Question Type</Label>
              <Select
                value={currentQuestion.type}
                onValueChange={(value: "multiple-choice" | "text") =>
                  setCurrentQuestion({ ...currentQuestion, type: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="text">Text Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Question Text */}
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                }
                placeholder="Enter your question..."
                rows={3}
                className="mt-2 resize-none"
              />
            </div>

            {/* Multiple Choice Options */}
            {currentQuestion.type === "multiple-choice" && (
              <div>
                <Label>Answer Options</Label>
                <div className="space-y-3 mt-2">
                  <RadioGroup
                    value={currentQuestion.correctAnswer?.toString()}
                    onValueChange={(value) =>
                      setCurrentQuestion({ ...currentQuestion, correctAnswer: parseInt(value) })
                    }
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1"
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="text-xs text-muted-foreground whitespace-nowrap"
                        >
                          {currentQuestion.correctAnswer === index && "(Correct)"}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Select the radio button for the correct answer
                </p>
              </div>
            )}

            {/* Points */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  max="100"
                  value={currentQuestion.points}
                  onChange={(e) =>
                    setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 10 })
                  }
                  className="mt-2"
                />
              </div>
            </div>

            {/* Add Question Button */}
            <Button onClick={handleAddQuestion} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Question to Quiz
            </Button>
          </div>
        </Card>

        {/* Questions List */}
        {questions.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Quiz Questions</h2>
              <Badge variant="outline">
                Total: {totalPoints} points
              </Badge>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => (
                <Card key={q.id} className="p-4 bg-muted/50">
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1">{index + 1}</Badge>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{q.question}</p>
                      {q.type === "multiple-choice" && q.options && (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {q.options.map((opt, i) => (
                            <li key={i} className={i === q.correctAnswer ? "text-green-600 dark:text-green-400 font-medium" : ""}>
                              {i + 1}. {opt} {i === q.correctAnswer && "✓"}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">{q.points} points</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveQuestion(q.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Save Button */}
        {questions.length > 0 && (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Quiz ({questions.length} questions)
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

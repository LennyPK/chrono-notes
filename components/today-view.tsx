"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Flag, MoreHorizontal, Star, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type Task = {
  id: string
  title: string
  description?: string
  completed: boolean
  dueDate?: string
  priority: "low" | "medium" | "high"
  tags: string[]
  starred: boolean
}

// Mock data for today's tasks
const TODAY_TASKS: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the quarterly project proposal for the marketing team",
    completed: false,
    dueDate: new Date().toISOString().split("T")[0],
    priority: "high",
    tags: ["work", "important"],
    starred: true,
  },
  {
    id: "4",
    title: "Review team performance",
    completed: false,
    dueDate: new Date().toISOString().split("T")[0],
    priority: "high",
    tags: ["work", "management"],
    starred: true,
  },
  {
    id: "8",
    title: "Call mom",
    completed: false,
    dueDate: new Date().toISOString().split("T")[0],
    priority: "medium",
    tags: ["personal"],
    starred: false,
  },
  {
    id: "9",
    title: "Prepare presentation slides",
    description: "Create slides for tomorrow's client meeting",
    completed: false,
    dueDate: new Date().toISOString().split("T")[0],
    priority: "high",
    tags: ["work", "client"],
    starred: false,
  },
]

export function TodayView() {
  const [tasks, setTasks] = useState<Task[]>(TODAY_TASKS)

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const toggleTaskStar = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, starred: !task.starred } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-orange-500"
      case "low":
        return "text-green-500"
      default:
        return ""
    }
  }

  // Get today's date in a readable format
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const formattedDate = today.toLocaleDateString("en-US", options)

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold">Today</h2>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No tasks for today</div>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className={task.completed ? "opacity-70" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-0.5 h-5 w-5"
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                    <span className="sr-only">{task.completed ? "Mark as incomplete" : "Mark as complete"}</span>
                  </Button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </h3>

                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleTaskStar(task.id)}>
                          <Star className={`h-4 w-4 ${task.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                          <span className="sr-only">{task.starred ? "Remove star" : "Star task"}</span>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleTaskCompletion(task.id)}>
                              {task.completed ? "Mark as incomplete" : "Mark as complete"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleTaskStar(task.id)}>
                              {task.starred ? "Remove star" : "Star task"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteTask(task.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <div className={`flex items-center text-xs ${getPriorityColor(task.priority)}`}>
                        <Flag className="h-3 w-3 mr-1" />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </div>

                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}


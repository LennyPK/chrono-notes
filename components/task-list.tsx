"use client"

import { useState } from "react"
import { Calendar, CheckCircle2, Circle, Flag, MoreHorizontal, Star, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the quarterly project proposal for the marketing team",
    completed: false,
    dueDate: "2025-04-10",
    priority: "high",
    tags: ["work", "important"],
    starred: true,
  },
  {
    id: "2",
    title: "Schedule dentist appointment",
    completed: false,
    dueDate: "2025-04-15",
    priority: "medium",
    tags: ["personal", "health"],
    starred: false,
  },
  {
    id: "3",
    title: "Buy groceries",
    description: "Milk, eggs, bread, fruits, vegetables",
    completed: true,
    priority: "low",
    tags: ["personal"],
    starred: false,
  },
  {
    id: "4",
    title: "Review team performance",
    completed: false,
    dueDate: "2025-04-07",
    priority: "high",
    tags: ["work", "management"],
    starred: true,
  },
  {
    id: "5",
    title: "Plan weekend trip",
    description: "Research hotels and activities",
    completed: false,
    dueDate: "2025-04-20",
    priority: "medium",
    tags: ["personal", "travel"],
    starred: false,
  },
]

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "completed">("all")

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    )
  }

  const toggleTaskStar = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, starred: !task.starred } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const filteredTasks = tasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0]

    switch (filter) {
      case "all":
        return true
      case "today":
        return task.dueDate === today && !task.completed
      case "upcoming":
        return task.dueDate && task.dueDate > today && !task.completed
      case "completed":
        return task.completed
      default:
        return true
    }
  })

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

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="mb-4 grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">No tasks found</div>
        ) : (
          filteredTasks.map((task) => (
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
                    <span className="sr-only">
                      {task.completed ? "Mark as incomplete" : "Mark as complete"}
                    </span>
                  </Button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}
                      >
                        {task.title}
                      </h3>

                      <div className="flex shrink-0 items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleTaskStar(task.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${task.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
                          />
                          <span className="sr-only">
                            {task.starred ? "Remove star" : "Star task"}
                          </span>
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
                            <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {task.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}

                      <div
                        className={`flex items-center text-xs ${getPriorityColor(task.priority)}`}
                      >
                        <Flag className="mr-1 h-3 w-3" />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </div>

                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="mr-1 h-3 w-3" />
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

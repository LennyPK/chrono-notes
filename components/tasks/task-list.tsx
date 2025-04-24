"use client"

import { Task } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Check, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ResizablePanel } from "../ui/resizable"

interface TaskListProps {
  tasks: Task[]
  selectedTaskID: string | undefined
  onTaskSelect: (task: Task) => void
  onTaskToggle: (taskID: string) => void
  onTaskAdd: () => void
  listName: string
}

export function TaskList({
  tasks,
  selectedTaskID,
  onTaskSelect,
  onTaskToggle,
  onTaskAdd,
  listName,
}: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatListName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <ResizablePanel defaultSize={30} minSize={20} className="flex h-full w-80 flex-col">
      {/* Task List Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">{formatListName(listName)}</h2>
        <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={onTaskAdd}>
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Add Task */}
      <div className="p-4">
        <div className="relative">
          <Plus className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Add a task" />
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-auto">
        <div className="divide-y">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "cursor-pointer p-4 hover:bg-muted/50",
                selectedTaskID === task.id && "bg-muted"
              )}
              onClick={() => onTaskSelect(task)}
            >
              <div className="flex items-start gap-3">
                <button
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border"
                  onClick={(e) => {
                    e.stopPropagation()
                    onTaskToggle(task.id)
                  }}
                >
                  {task.completed && <Check className="h-3 w-3" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      task.completed && "text-muted-foreground line-through"
                    )}
                  >
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Due: {task.dueDate.toString()}
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    "h-2 w-2 flex-shrink-0 rounded-full",
                    task.priority === "high" && "bg-red-500",
                    task.priority === "medium" && "bg-yellow-500",
                    task.priority === "low" && "bg-blue-500"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResizablePanel>
  )
}

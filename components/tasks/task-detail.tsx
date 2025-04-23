"use client"

import { Task } from "@/lib/types"
import { CalendarIcon, Clock, Tag, Trash2, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"

interface TaskDetailProps {
  task: Task
  onTaskUpdate: (updatedTask: Task) => void
  onTaskDelete: (taskID: string) => void
}

export function TaskDetail({ task, onTaskUpdate, onTaskDelete }: TaskDetailProps) {
  const [editedTask, setEditedTask] = useState<Task>(task)
  const [newTag, setNewTag] = useState("")

  const handleChange = (field: keyof Task, value: any) => {
    setEditedTask({ ...editedTask, [field]: value })
    onTaskUpdate({ ...editedTask, [field]: value })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !editedTask.tags.includes(newTag.trim())) {
      const updatedTask = {
        ...editedTask,
        tags: [...editedTask.tags, newTag.trim()],
      }
      setEditedTask(updatedTask)
      onTaskUpdate(updatedTask)
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTask = {
      ...editedTask,
      tags: editedTask.tags.filter((tag) => tag !== tagToRemove),
    }
    setEditedTask(updatedTask)
    onTaskUpdate(updatedTask)
  }

  return (
    <div className="flex h-full flex-1 flex-col border-l pr-20">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-medium">Task Details</h3>
        <Button variant="ghost" size="icon" onClick={() => onTaskDelete(task.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 space-y-6 overflow-auto p-4">
        <div className="space-y-2">
          <Input
            value={editedTask.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="text-lg font-medium"
            placeholder="Task title"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Due Date</span>
          </div>
          <Input
            type="date"
            value={editedTask.dueDate?.toISOString().split("T")[0]}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>Priority</span>
          </div>
          <Select
            value={editedTask.priority}
            onValueChange={(value) => handleChange("priority", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Low</span>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
                  <span>Medium</span>
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                  <span>High</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Tag className="mr-2 h-4 w-4" />
            <span>Tags</span>
          </div>
          <div className="mb-2 flex flex-wrap gap-2">
            {editedTask.tags.map((tag) => (
              <div key={tag} className="flex items-center rounded-md bg-muted px-2 py-1 text-xs">
                <span>{tag}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 h-4 w-4"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <Button size="sm" onClick={handleAddTag}>
              Add
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Notes</div>
          <Textarea
            value={editedTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add notes here..."
            className="min-h-[150px]"
          />
        </div>
      </div>
    </div>
  )
}

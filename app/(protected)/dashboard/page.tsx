"use client"

import { TaskDetail } from "@/components/tasks/task-detail"
import { TaskFolders } from "@/components/tasks/task-folders"
import { TaskList } from "@/components/tasks/task-list"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Task } from "@/lib/types"
import { useEffect, useState } from "react"
import { createTask, getTodos } from "./actions"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [todos, setTodos] = useState<any[]>([])
  const [todosError, setTodosError] = useState("")

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedList, setSelectedList] = useState("all")
  const [tasks, setTasks] = useState<Task[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createTask(formData)

      if (result?.error) {
        setError(result.error)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
      // refresh the todos
      const { data, error: todosError } = await getTodos()
      if (todosError) {
        setTodosError(todosError.message)
      } else {
        setTasks(data || [])
      }
    }
  }

  useEffect(() => {
    async function loadTodos() {
      const { data, error } = await getTodos()
      if (error) {
        setTodosError(error.message)
      } else {
        setTodos(data || [])
      }
    }
    loadTodos()
  }, [])

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task)
  }

  const handleListSelect = (list: string) => {
    setSelectedList(list)
    setSelectedTask(null)
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setSelectedTask(updatedTask)
  }

  const handleTaskToggle = (taskId: string) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    )

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({
        ...selectedTask,
        completed: !selectedTask.completed,
      })
    }
  }

  const handleTaskAdd = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: "New task",
      description: "",
      dueDate: null,
      priority: "medium",
      listID: selectedList,
      tags: [],
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setTasks([newTask, ...tasks])
    setSelectedTask(newTask)
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null)
    }
  }

  const filteredTasks = tasks.filter((task) => task.listID === selectedList)

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border md:min-w-screen"
    >
      <TaskFolders selectedList={selectedList} onListSelect={handleListSelect} />
      <ResizableHandle />
      <TaskList
        tasks={filteredTasks}
        selectedTaskID={selectedTask?.id}
        onTaskSelect={handleTaskSelect}
        onTaskToggle={handleTaskToggle}
        onTaskAdd={handleTaskAdd}
        listName={selectedList}
      />
      <ResizableHandle />
      {selectedTask ? (
        <TaskDetail
          task={selectedTask}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      ) : (
        <ResizablePanel
          minSize={15}
          className="flex h-full flex-1 flex-col items-center justify-center border-l pr-20"
        >
          <span className="text-muted-foreground">No Task Selected</span>
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  )
}

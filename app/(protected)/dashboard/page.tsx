"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/ui/sidebar"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { createTask, getTodos } from "./actions"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [todos, setTodos] = useState<any[]>([])
  const [todosError, setTodosError] = useState("")

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
        setTodos(data || [])
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

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Sidebar></Sidebar>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="New Task"
          required
          onChange={() => setError("")}
        />
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="Description"
          onChange={() => setError("")}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Task...
            </>
          ) : (
            "Create Task"
          )}
        </Button>
      </form>
      <div className="mt-4">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <div className="rounded-lg border bg-card">
            {todos?.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No tasks yet. Create one above!
              </div>
            ) : (
              <div className="divide-y">
                {todos?.map((todo) => (
                  <div key={todo.id} className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium">{todo.title}</h3>
                      {todo.description && (
                        <p className="text-sm text-muted-foreground">{todo.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Button
												variant="ghost"
												size="sm"
												onClick={() => toggleTodo(todo.id)}
												className={todo.completed ? "text-primary" : ""}
											>
												{todo.completed ? "Completed" : "Mark Complete"}
											</Button>
											<Button
												variant="ghost"
												size="sm"
												className="text-destructive"
												onClick={() => deleteTodo(todo.id)}
											>
												Delete
											</Button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

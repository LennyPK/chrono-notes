export interface Task {
  id: string
  title: string
  description: string
  dueDate: Date | null
  priority: "none" | "low" | "medium" | "high"
  listID: string
  tags: string[]
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

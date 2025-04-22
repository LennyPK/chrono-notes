"use server"

import { createClient } from "@/utils/supabase/server"

export async function createTask(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const title = formData.get("title") as string
  const description = formData.get("description") as string

  const { data: todoData, error: todoError } = await supabase.from("todos").insert({
    id: crypto.randomUUID(),
    title: title,
    completed: false,
    created_at: new Date().toISOString(),
    description: description,
    user_id: user?.id,
  })

  if (todoError) {
    return { error: todoError.message }
  }

  return { todoData }
}

export async function getTodos() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase.from("todos").select("*").eq("user_id", user?.id)

  return { data, error }
}

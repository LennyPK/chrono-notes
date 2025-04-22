"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  // First, sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  // Then, create their profile
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        full_name: name,
        email: email,
      },
    ])

    if (profileError) {
      return { error: profileError.message }
    }
  }

  revalidatePath("/dashboard")
  redirect("/confirm")
}

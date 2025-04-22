"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function signin(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Return the error message to be displayed in the UI
    return { error: error.message }
  }

  // If successful, redirect to dashboard
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

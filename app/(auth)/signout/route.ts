import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const next = searchParams.get("next") ?? "/"

  const supabase = await createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      redirect(next)
    }

    if (error) {
      redirect("/error")
    }
  }

  redirect(next)
}

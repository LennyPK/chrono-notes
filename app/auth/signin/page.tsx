"use client"

import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signin } from "./actions"

export default function SignInPage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError("")
		setIsLoading(true)

		try {
			const formData = new FormData(e.currentTarget)
			const result = await signin(formData)

			if (result?.error) {
				setError(result.error)
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
			<Link href="/" className="absolute left-8 top-8 flex items-center gap-2 md:left-12 md:top-12">
				<CheckCircle className="h-6 w-6 text-primary" />
				<span className="text-xl font-bold">ChronoNotes</span>
			</Link>

			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Sign in</CardTitle>
					<CardDescription>Enter your email and password to access your account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{/* <div className="grid grid-cols-2 gap-4">
							<Button variant="outline" className="w-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="mr-2 h-4 w-4"
								>
									<path
										fill="currentColor"
										d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									/>
								</svg>
								Google
							</Button>
							<Button variant="outline" className="w-full">
								<Github className="mr-2 h-4 w-4" />
								GitHub
							</Button>
						</div>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
							</div>
						</div> */}
						<form onSubmit={handleSubmit} className="space-y-4">
							{error && (
								<div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
									{error}
								</div>
							)}
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="name@example.com"
									required
									onChange={() => setError("")}
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Password</Label>
									<Link
										href="/auth/forgot-password"
										className="text-sm font-medium text-primary underline-offset-4 hover:underline"
									>
										Forgot password?
									</Link>
								</div>
								<Input
									id="password"
									name="password"
									type="password"
									required
									onChange={() => setError("")}
								/>
							</div>
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing in...
									</>
								) : (
									"Sign in"
								)}
							</Button>
						</form>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col">
					<div className="text-sm text-muted-foreground text-center">
						Don&apos;t have an account?{" "}
						<Link
							href="/auth/signup"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

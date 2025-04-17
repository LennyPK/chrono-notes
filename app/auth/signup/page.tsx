"use client"

import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup } from "./actions"

export default function SignUpPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [acceptTerms, setAcceptTerms] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError("")

		if (!acceptTerms) {
			setError("You must accept the terms and conditions to create an account.")
			return
		}

		setIsLoading(true)

		try {
			const formData = new FormData(e.currentTarget)
			const result = await signup(formData)

			if (result?.error) {
				setError(result.error)
			}
		} catch (err) {
			setError("An error occurred during registration. Please try again.")
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
					<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
					<CardDescription>Enter your information to create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<form onSubmit={handleSubmit} className="space-y-4">
							{error && (
								<div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
									{error}
								</div>
							)}
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input id="name" name="name" type="text" placeholder="John Doe" required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="name@example.com"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" name="password" type="password" required />
								<p className="text-xs text-muted-foreground">
									Password must be at least 8 characters long
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox
									id="terms"
									checked={acceptTerms}
									onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
								/>
								<label
									htmlFor="terms"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I agree to the{" "}
									<Link href="/terms" className="text-primary underline-offset-4 hover:underline">
										terms of service
									</Link>{" "}
									and{" "}
									<Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
										privacy policy
									</Link>
								</label>
							</div>
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creating account...
									</>
								) : (
									"Create account"
								)}
							</Button>
						</form>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col">
					<div className="text-sm text-muted-foreground text-center">
						Already have an account?{" "}
						<Link
							href="/auth/signin"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Sign in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

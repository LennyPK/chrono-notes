import { CheckCircle, CheckCircle2, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<header className="border-b bg-background">
				<div className="container flex h-16 items-center justify-between px-4 md:px-6">
					<div className="flex items-center gap-2">
						<CheckCircle className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">ChronoNotes</span>
					</div>
					<nav className="hidden md:flex gap-6">
						<Link
							href="#features"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Features
						</Link>
						<Link
							href="#pricing"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Pricing
						</Link>
						<Link
							href="#testimonials"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Testimonials
						</Link>
						<Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
							FAQ
						</Link>
					</nav>
					<div className="flex items-center gap-4">
						<Link
							href="/auth/signin"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							Sign In
						</Link>
						<Link
							href="/auth/signup"
							className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
						>
							Get Started
						</Link>
					</div>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
										Organize your work and life, finally.
									</h1>
									<p className="max-w-[600px] text-muted-foreground md:text-xl">
										Become focused, organized, and calm with ChronoNotes. The world's #1 task
										manager and note-taking app.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Link
										href="/auth/signup"
										className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
									>
										Get Started for Free
									</Link>
									<Link
										href="#features"
										className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
									>
										Learn More
									</Link>
								</div>
							</div>
							<div className="flex items-center justify-center">
								<div className="relative w-full max-w-[600px] overflow-hidden rounded-xl border bg-background shadow-xl">
									<Image
										src="/placeholder.svg?height=600&width=800"
										width={800}
										height={600}
										alt="ChronoNotes Dashboard"
										className="aspect-[4/3] object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									Everything you need to stay organized
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									ChronoNotes combines powerful task management with intuitive note-taking to help
									you achieve more every day.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
							<div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
								<div className="rounded-full bg-primary/10 p-3">
									<CheckCircle2 className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">Task Management</h3>
								<p className="text-center text-muted-foreground">
									Create, organize, and prioritize tasks with ease. Set due dates, reminders, and
									recurring tasks.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
								<div className="rounded-full bg-primary/10 p-3">
									<Star className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">Smart Lists</h3>
								<p className="text-center text-muted-foreground">
									Automatically organize tasks into Today, Upcoming, and custom smart lists based on
									your criteria.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
								<div className="rounded-full bg-primary/10 p-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-6 w-6 text-primary"
									>
										<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Focus Timer</h3>
								<p className="text-center text-muted-foreground">
									Stay focused with built-in Pomodoro timer. Track your productivity and build
									better habits.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
								<div className="rounded-full bg-primary/10 p-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-6 w-6 text-primary"
									>
										<path d="M14 3v4a1 1 0 0 0 1 1h4" />
										<path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
										<path d="M9 9h1" />
										<path d="M9 13h6" />
										<path d="M9 17h6" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Notes & Wiki</h3>
								<p className="text-center text-muted-foreground">
									Create rich notes with Markdown support. Link notes together for a personal
									knowledge base.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
								<div className="rounded-full bg-primary/10 p-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-6 w-6 text-primary"
									>
										<rect width="18" height="18" x="3" y="3" rx="2" />
										<path d="M8 12h8" />
										<path d="M12 8v8" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Habit Tracker</h3>
								<p className="text-center text-muted-foreground">
									Build and maintain habits with our built-in habit tracker. Visualize your progress
									over time.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
								<div className="rounded-full bg-primary/10 p-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-6 w-6 text-primary"
									>
										<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
										<path d="m9 12 2 2 4-4" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Cross-Platform</h3>
								<p className="text-center text-muted-foreground">
									Access your tasks and notes from anywhere. Sync across all your devices
									seamlessly.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

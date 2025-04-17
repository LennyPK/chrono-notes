"use client"

import { NoteDetail } from "@/components/note-detail"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	File,
	FileText,
	FolderOpen,
	Grid,
	List,
	MoreHorizontal,
	Plus,
	Search,
	Tag,
} from "lucide-react"
import { useState } from "react"

type Note = {
	id: string
	title: string
	content: string
	excerpt: string
	tags: string[]
	createdAt: string
	updatedAt: string
	folder?: string
}

// Mock data for notes
const MOCK_NOTES: Note[] = [
	{
		id: "1",
		title: "Project Ideas",
		content:
			"# Project Ideas\n\nHere are some project ideas for the upcoming quarter:\n\n- Mobile app redesign\n- Customer feedback system\n- Internal knowledge base\n- API documentation portal\n\nLinking to [[Meeting Notes]] for more context.",
		excerpt: "Here are some project ideas for the upcoming quarter...",
		tags: ["work", "projects", "ideas"],
		createdAt: "2025-03-15T10:30:00Z",
		updatedAt: "2025-04-02T14:20:00Z",
		folder: "Work",
	},
	{
		id: "2",
		title: "Meeting Notes",
		content:
			"# Meeting Notes\n\n## Quarterly Planning\n\nAttendees: John, Sarah, Mike, Lisa\n\n### Action Items\n\n- [ ] Sarah to prepare budget proposal\n- [ ] Mike to schedule follow-up with design team\n- [ ] John to finalize project timeline\n\nSee also [[Project Ideas]]",
		excerpt: "Quarterly Planning\nAttendees: John, Sarah, Mike, Lisa...",
		tags: ["work", "meetings", "planning"],
		createdAt: "2025-03-20T09:15:00Z",
		updatedAt: "2025-03-20T11:45:00Z",
		folder: "Work",
	},
	{
		id: "3",
		title: "Book Recommendations",
		content:
			"# Books to Read\n\n- Atomic Habits by James Clear\n- Deep Work by Cal Newport\n- The Psychology of Money by Morgan Housel\n- Four Thousand Weeks by Oliver Burkeman\n\n## Currently Reading\n\nDeep Work - on page 78",
		excerpt: "Books to Read\n- Atomic Habits by James Clear\n- Deep Work by Cal Newport...",
		tags: ["personal", "books", "reading"],
		createdAt: "2025-02-10T18:30:00Z",
		updatedAt: "2025-04-01T20:15:00Z",
		folder: "Personal",
	},
	{
		id: "4",
		title: "Learning Goals",
		content:
			"# Learning Goals for 2025\n\n1. Improve React skills\n   - Learn more about React Server Components\n   - Master Next.js App Router\n   - Build 3 projects using new skills\n\n2. Data Visualization\n   - Learn D3.js basics\n   - Create interactive dashboard\n\n3. Writing\n   - Write one technical article per month\n   - Start personal blog",
		excerpt:
			"Learning Goals for 2025\n1. Improve React skills\n2. Data Visualization\n3. Writing...",
		tags: ["personal", "learning", "goals"],
		createdAt: "2025-01-05T12:00:00Z",
		updatedAt: "2025-03-15T16:30:00Z",
		folder: "Personal",
	},
	{
		id: "5",
		title: "Travel Plans",
		content:
			"# Travel Plans\n\n## Summer 2025\n\n- **Japan** (2 weeks)\n  - Tokyo\n  - Kyoto\n  - Osaka\n\n## Fall 2025\n\n- **Italy** (10 days)\n  - Rome\n  - Florence\n  - Venice\n\n## Budget\n\nEstimated total: $8,000",
		excerpt: "Travel Plans\nSummer 2025\n- Japan (2 weeks)\nFall 2025\n- Italy (10 days)...",
		tags: ["personal", "travel", "planning"],
		createdAt: "2025-02-28T15:45:00Z",
		updatedAt: "2025-03-10T09:20:00Z",
		folder: "Personal",
	},
]

interface NotesViewProps {
	onNewNote: () => void
}

export function NotesView({ onNewNote }: NotesViewProps) {
	const [notes, setNotes] = useState<Note[]>(MOCK_NOTES)
	const [searchQuery, setSearchQuery] = useState("")
	const [viewMode, setViewMode] = useState<"list" | "grid">("list")
	const [selectedNote, setSelectedNote] = useState<Note | null>(null)

	const filteredNotes = notes.filter((note) => {
		if (!searchQuery.trim()) return true

		const query = searchQuery.toLowerCase()
		return (
			note.title.toLowerCase().includes(query) ||
			note.content.toLowerCase().includes(query) ||
			note.tags.some((tag) => tag.toLowerCase().includes(query))
		)
	})

	const handleDeleteNote = (noteId: string) => {
		setNotes(notes.filter((note) => note.id !== noteId))
		if (selectedNote?.id === noteId) {
			setSelectedNote(null)
		}
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	// Group notes by folder
	const notesByFolder = filteredNotes.reduce((acc, note) => {
		const folder = note.folder || "Unfiled"
		if (!acc[folder]) {
			acc[folder] = []
		}
		acc[folder].push(note)
		return acc
	}, {} as Record<string, Note[]>)

	// Get all unique tags
	const allTags = Array.from(new Set(notes.flatMap((note) => note.tags))).sort()

	return (
		<div className="h-full">
			{selectedNote ? (
				<NoteDetail note={selectedNote} onBack={() => setSelectedNote(null)} />
			) : (
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search notes..."
								className="pl-8"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
						>
							{viewMode === "list" ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
						</Button>
						<Button onClick={onNewNote}>
							<Plus className="h-4 w-4 mr-1" />
							New Note
						</Button>
					</div>

					<Tabs defaultValue="all">
						<TabsList>
							<TabsTrigger value="all">All Notes</TabsTrigger>
							<TabsTrigger value="folders">Folders</TabsTrigger>
							<TabsTrigger value="tags">Tags</TabsTrigger>
						</TabsList>

						<TabsContent value="all" className="space-y-4 mt-4">
							{viewMode === "list" ? (
								<div className="space-y-2">
									{filteredNotes.length === 0 ? (
										<div className="text-center py-8 text-muted-foreground">No notes found</div>
									) : (
										filteredNotes.map((note) => (
											<Card
												key={note.id}
												className="cursor-pointer hover:bg-muted/50"
												onClick={() => setSelectedNote(note)}
											>
												<CardContent className="p-4">
													<div className="flex items-start justify-between">
														<div className="flex-1 min-w-0">
															<div className="flex items-center gap-2">
																<FileText className="h-4 w-4 text-muted-foreground shrink-0" />
																<h3 className="font-medium truncate">{note.title}</h3>
															</div>
															<p className="text-sm text-muted-foreground mt-1 line-clamp-2">
																{note.excerpt}
															</p>
															<div className="flex flex-wrap items-center gap-2 mt-2">
																<span className="text-xs text-muted-foreground">
																	Updated {formatDate(note.updatedAt)}
																</span>
																{note.tags.slice(0, 3).map((tag) => (
																	<Badge key={tag} variant="outline" className="text-xs">
																		{tag}
																	</Badge>
																))}
																{note.tags.length > 3 && (
																	<Badge variant="outline" className="text-xs">
																		+{note.tags.length - 3} more
																	</Badge>
																)}
															</div>
														</div>
														<DropdownMenu>
															<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
																<Button variant="ghost" size="icon" className="h-8 w-8">
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">More options</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem
																	onClick={(e) => {
																		e.stopPropagation()
																		setSelectedNote(note)
																	}}
																>
																	View
																</DropdownMenuItem>
																<DropdownMenuItem
																	onClick={(e) => {
																		e.stopPropagation()
																		// Edit functionality would go here
																	}}
																>
																	Edit
																</DropdownMenuItem>
																<DropdownMenuItem
																	onClick={(e) => {
																		e.stopPropagation()
																		handleDeleteNote(note.id)
																	}}
																>
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</CardContent>
											</Card>
										))
									)}
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{filteredNotes.length === 0 ? (
										<div className="text-center py-8 text-muted-foreground col-span-full">
											No notes found
										</div>
									) : (
										filteredNotes.map((note) => (
											<Card
												key={note.id}
												className="cursor-pointer hover:bg-muted/50"
												onClick={() => setSelectedNote(note)}
											>
												<CardContent className="p-4">
													<div className="flex flex-col h-full">
														<div className="flex items-center justify-between mb-2">
															<div className="flex items-center gap-2">
																<FileText className="h-4 w-4 text-muted-foreground" />
																<h3 className="font-medium truncate">{note.title}</h3>
															</div>
															<DropdownMenu>
																<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
																	<Button variant="ghost" size="icon" className="h-8 w-8">
																		<MoreHorizontal className="h-4 w-4" />
																		<span className="sr-only">More options</span>
																	</Button>
																</DropdownMenuTrigger>
																<DropdownMenuContent align="end">
																	<DropdownMenuItem
																		onClick={(e) => {
																			e.stopPropagation()
																			setSelectedNote(note)
																		}}
																	>
																		View
																	</DropdownMenuItem>
																	<DropdownMenuItem
																		onClick={(e) => {
																			e.stopPropagation()
																			// Edit functionality would go here
																		}}
																	>
																		Edit
																	</DropdownMenuItem>
																	<DropdownMenuItem
																		onClick={(e) => {
																			e.stopPropagation()
																			handleDeleteNote(note.id)
																		}}
																	>
																		Delete
																	</DropdownMenuItem>
																</DropdownMenuContent>
															</DropdownMenu>
														</div>
														<p className="text-sm text-muted-foreground line-clamp-3 flex-1">
															{note.excerpt}
														</p>
														<div className="flex flex-wrap items-center gap-2 mt-2">
															<span className="text-xs text-muted-foreground">
																{formatDate(note.updatedAt)}
															</span>
															{note.tags.slice(0, 2).map((tag) => (
																<Badge key={tag} variant="outline" className="text-xs">
																	{tag}
																</Badge>
															))}
															{note.tags.length > 2 && (
																<Badge variant="outline" className="text-xs">
																	+{note.tags.length - 2}
																</Badge>
															)}
														</div>
													</div>
												</CardContent>
											</Card>
										))
									)}
								</div>
							)}
						</TabsContent>

						<TabsContent value="folders" className="space-y-4 mt-4">
							{Object.keys(notesByFolder).length === 0 ? (
								<div className="text-center py-8 text-muted-foreground">No notes found</div>
							) : (
								Object.entries(notesByFolder).map(([folder, folderNotes]) => (
									<div key={folder} className="space-y-2">
										<div className="flex items-center gap-2">
											<FolderOpen className="h-4 w-4 text-muted-foreground" />
											<h3 className="font-medium">{folder}</h3>
											<span className="text-xs text-muted-foreground">({folderNotes.length})</span>
										</div>
										<div className="pl-6 space-y-2">
											{folderNotes.map((note) => (
												<Card
													key={note.id}
													className="cursor-pointer hover:bg-muted/50"
													onClick={() => setSelectedNote(note)}
												>
													<CardContent className="p-3">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<File className="h-4 w-4 text-muted-foreground" />
																<span>{note.title}</span>
															</div>
															<span className="text-xs text-muted-foreground">
																{formatDate(note.updatedAt)}
															</span>
														</div>
													</CardContent>
												</Card>
											))}
										</div>
									</div>
								))
							)}
						</TabsContent>

						<TabsContent value="tags" className="space-y-4 mt-4">
							{allTags.length === 0 ? (
								<div className="text-center py-8 text-muted-foreground">No tags found</div>
							) : (
								<div className="space-y-4">
									<div className="flex flex-wrap gap-2">
										{allTags.map((tag) => (
											<Badge key={tag} variant="secondary" className="cursor-pointer">
												<Tag className="h-3 w-3 mr-1" />
												{tag}
												<span className="ml-1 text-xs">
													({notes.filter((note) => note.tags.includes(tag)).length})
												</span>
											</Badge>
										))}
									</div>
								</div>
							)}
						</TabsContent>
					</Tabs>
				</div>
			)}
		</div>
	)
}

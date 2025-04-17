"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import { CalendarView } from "@/components/calendar-view"
import { StatsView } from "@/components/stats-view"
import { TodayView } from "@/components/today-view"
import { NotesView } from "@/components/notes-view"
import { NoteForm } from "@/components/note-form"

type View = "tasks" | "today" | "calendar" | "notes" | "stats"

export function DashboardPage() {
  const [currentView, setCurrentView] = useState<View>("tasks")
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)

  const handleNewItem = () => {
    if (currentView === "notes") {
      setShowNoteForm(true)
    } else {
      setShowTaskForm(true)
    }
  }

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView} onNewItem={handleNewItem}>
      {currentView === "tasks" && <TaskList />}
      {currentView === "today" && <TodayView />}
      {currentView === "calendar" && <CalendarView />}
      {currentView === "notes" && <NotesView onNewNote={() => setShowNoteForm(true)} />}
      {currentView === "stats" && <StatsView />}

      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}

      {showNoteForm && <NoteForm onClose={() => setShowNoteForm(false)} />}
    </DashboardLayout>
  )
}


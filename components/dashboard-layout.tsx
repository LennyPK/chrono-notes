"use client"

import type React from "react"

import { useState } from "react"
import {
  Calendar,
  CheckCircle,
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  Plus,
  Settings,
  StickyNote,
  Sun,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"

type View = "tasks" | "today" | "calendar" | "notes" | "stats"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentView: View
  onViewChange: (view: View) => void
  onNewItem: () => void
}

export function DashboardLayout({ children, currentView, onViewChange, onNewItem }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const navItems = [
    {
      icon: List,
      label: "All Tasks",
      value: "tasks" as const,
      active: currentView === "tasks",
    },
    {
      icon: Sun,
      label: "Today",
      value: "today" as const,
      active: currentView === "today",
    },
    {
      icon: Calendar,
      label: "Calendar",
      value: "calendar" as const,
      active: currentView === "calendar",
    },
    {
      icon: StickyNote,
      label: "Notes",
      value: "notes" as const,
      active: currentView === "notes",
    },
    {
      icon: LayoutDashboard,
      label: "Stats",
      value: "stats" as const,
      active: currentView === "stats",
    },
  ]

  const getButtonLabel = () => {
    if (currentView === "notes") {
      return "New Note"
    }
    return "New Task"
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">ChronoNotes</h1>
        </div>
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                onViewChange(item.value)
                setIsMobileSidebarOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="md:ml-64 flex-1 flex flex-col">
        <header className="bg-background border-b">
          <div className="flex h-16 items-center px-4">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>

            <div className="flex-1">
              <h1 className="text-xl font-semibold">
                {currentView === "tasks" && "All Tasks"}
                {currentView === "today" && "Today"}
                {currentView === "calendar" && "Calendar"}
                {currentView === "notes" && "Notes"}
                {currentView === "stats" && "Statistics"}
              </h1>
            </div>

            <Button onClick={onNewItem} size="sm" className="ml-auto">
              <Plus className="h-4 w-4 mr-1" />
              {getButtonLabel()}
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}


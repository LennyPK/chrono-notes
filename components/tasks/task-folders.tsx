"use client"

import { cn } from "@/lib/utils"
import {
  BarChart,
  Calendar,
  Clock,
  Flag,
  Folder,
  GalleryVerticalEnd,
  Inbox,
  Plus,
  Star,
  Sun,
  Tag,
} from "lucide-react"
import { Button } from "../ui/button"
import { ResizablePanel } from "../ui/resizable"

interface TaskFolderProps {
  selectedList: string
  onListSelect: (listId: string) => void
}

export function TaskFolders({ selectedList, onListSelect }: TaskFolderProps) {
  const mainLists = [
    { id: "all", name: "All", icon: <GalleryVerticalEnd className="h-4 w-4" /> },
    { id: "today", name: "Today", icon: <Sun className="h-4 w-4" /> },
    { id: "next-7-days", name: "Next 7 Days", icon: <Calendar className="h-4 w-4" /> },
    { id: "inbox", name: "Inbox", icon: <Inbox className="h-4 w-4" /> },
    { id: "summary", name: "Summary", icon: <BarChart className="h-4 w-4" /> },
  ]

  const smartLists = [
    { id: "important", name: "Important", icon: <Star className="h-4 w-4" /> },
    { id: "planned", name: "Planned", icon: <Clock className="h-4 w-4" /> },
    { id: "flagged", name: "Flagged", icon: <Flag className="h-4 w-4" /> },
    { id: "tags", name: "Tags", icon: <Tag className="h-4 w-4" /> },
  ]

  const customLists = [
    // change this to dynamic
    { id: "personal", name: "Personal", icon: <Folder className="h-4 w-4" /> },
    { id: "work", name: "Work", icon: <Folder className="h-4 w-4" /> },
    { id: "shopping", name: "Shopping", icon: <Folder className="h-4 w-4" /> },
  ]

  return (
    <ResizablePanel
      defaultSize={20}
      minSize={10}
      maxSize={25}
      className="flex h-full w-64 flex-col border-r bg-muted/10"
    >
      <div className="flex-1 overflow-auto py-2">
        {/* Main Lists */}
        <div className="px-3 py-2">
          <div className="space-y-1">
            {mainLists.map((list) => (
              <Button
                key={list.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  selectedList === list.id && "bg-accent text-accent-foreground"
                )}
                onClick={() => onListSelect(list.id)}
              >
                {list.icon}
                <span className="ml-2">{list.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Smart Lists */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">SMART LISTS</h3>
          <div className="space-y-1">
            {smartLists.map((list) => (
              <Button
                key={list.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  selectedList === list.id && "bg-accent text-accent-foreground"
                )}
                onClick={() => onListSelect(list.id)}
              >
                {list.icon}
                <span className="ml-2">{list.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Lists */}
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center px-4">
            <h3 className="text-xs font-semibold text-muted-foreground">LISTS</h3>
            <Button variant="ghost" size="icon" className="ml-auto h-5 w-5">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {customLists.map((list) => (
              <Button
                key={list.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  selectedList === list.id && "bg-accent text-accent-foreground"
                )}
                onClick={() => onListSelect(list.id)}
              >
                {list.icon}
                <span className="ml-2">{list.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ResizablePanel>
  )
}

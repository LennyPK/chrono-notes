"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for calendar events
const MOCK_EVENTS = [
  { id: "1", title: "Complete project proposal", date: "2025-04-10", priority: "high" },
  { id: "2", title: "Schedule dentist appointment", date: "2025-04-15", priority: "medium" },
  { id: "4", title: "Review team performance", date: "2025-04-07", priority: "high" },
  { id: "5", title: "Plan weekend trip", date: "2025-04-20", priority: "medium" },
  { id: "6", title: "Team meeting", date: "2025-04-12", priority: "high" },
  { id: "7", title: "Submit expense report", date: "2025-04-18", priority: "low" },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const formatDateString = (day: number) => {
    const monthStr = String(month + 1).padStart(2, "0")
    const dayStr = String(day).padStart(2, "0")
    return `${year}-${monthStr}-${dayStr}`
  }

  const getEventsForDay = (day: number) => {
    const dateStr = formatDateString(day)
    return MOCK_EVENTS.filter((event) => event.date === dateStr)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-orange-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] border-r border-b p-2 ${day === null ? "bg-muted/30" : ""} ${
                  day === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear()
                    ? "bg-muted/50"
                    : ""
                }`}
              >
                {day !== null && (
                  <>
                    <div className="mb-1 text-sm font-medium">{day}</div>
                    <div className="space-y-1">
                      {getEventsForDay(day).map((event) => (
                        <div
                          key={event.id}
                          className="truncate rounded border bg-background p-1 text-xs"
                        >
                          <div className="flex items-center gap-1">
                            <div
                              className={`h-2 w-2 rounded-full ${getPriorityColor(event.priority)}`}
                            />
                            {event.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

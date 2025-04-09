"use client"

import { Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/lib/types"

interface TaskCardProps {
  task: Task
  onClick?: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-3 w-3" />
      case "medium":
        return <Clock className="h-3 w-3" />
      case "low":
        return <CheckCircle2 className="h-3 w-3" />
      default:
        return null
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return priority
    }
  }

  return (
    <Card className="cursor-pointer hover:shadow-md" onClick={onClick}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        {task.description && (
          <CardDescription className="text-xs line-clamp-2 mb-2">{task.description}</CardDescription>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getPriorityColor(task.priority)}`}
          >
            {getPriorityIcon(task.priority)}
            {getPriorityLabel(task.priority)}
          </span>
          {task.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 3).map((assignee, i) => (
            <div
              key={i}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white ring-2 ring-background"
            >
              {assignee.charAt(0)}
            </div>
          ))}
          {task.assignees.length > 3 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 ring-2 ring-background">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {task.dueDate}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}


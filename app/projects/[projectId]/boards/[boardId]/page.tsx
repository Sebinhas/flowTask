"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { use } from "react"

interface BoardPageProps {
  params: {
    projectId: string
    boardId: string
  }
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: "low" | "medium" | "high"
  assignees: string[]
  dueDate?: string
  tags: string[]
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

export default function BoardPage({ params }: BoardPageProps) {
  // Todos los useState deben estar al inicio del componente
  const [projectId, setProjectId] = useState<string>("")
  const [boardId, setBoardId] = useState<string>("")
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "Por Hacer",
      tasks: [
        {
          id: "task-1",
          title: "Investigar competidores",
          description:
            "Analizar los sitios web de los 5 principales competidores e identificar fortalezas y debilidades",
          status: "todo",
          priority: "medium",
          assignees: ["Juan Pérez"],
          dueDate: "5 Oct, 2023",
          tags: ["Investigación"],
        },
        {
          id: "task-2",
          title: "Crear wireframes",
          description: "Diseñar wireframes para la página principal, acerca de y páginas de contacto",
          status: "todo",
          priority: "high",
          assignees: ["María García"],
          dueDate: "8 Oct, 2023",
          tags: ["Diseño"],
        },
        {
          id: "task-3",
          title: "Inventario de contenido",
          description: "Catalogar todo el contenido existente e identificar brechas",
          status: "todo",
          priority: "low",
          assignees: ["Ana Martínez"],
          tags: ["Contenido"],
        },
      ],
    },
    {
      id: "in-progress",
      title: "En Progreso",
      tasks: [
        {
          id: "task-4",
          title: "Sistema de diseño",
          description: "Crear un sistema de diseño coherente que incluya colores, tipografía y componentes",
          status: "in-progress",
          priority: "high",
          assignees: ["María García"],
          dueDate: "10 Oct, 2023",
          tags: ["Diseño"],
        },
        {
          id: "task-5",
          title: "Personas de usuario",
          description: "Desarrollar personas de usuario detalladas para guiar las decisiones de diseño",
          status: "in-progress",
          priority: "medium",
          assignees: ["Juan Pérez", "Ana Martínez"],
          dueDate: "7 Oct, 2023",
          tags: ["Investigación", "UX"],
        },
      ],
    },
    {
      id: "review",
      title: "Revisión",
      tasks: [
        {
          id: "task-6",
          title: "Maqueta de página principal",
          description: "Maqueta de alta fidelidad de la página principal basada en wireframes aprobados",
          status: "review",
          priority: "high",
          assignees: ["María García"],
          dueDate: "12 Oct, 2023",
          tags: ["Diseño"],
        },
      ],
    },
    {
      id: "done",
      title: "Completado",
      tasks: [
        {
          id: "task-7",
          title: "Inicio del proyecto",
          description: "Reunión inicial para definir el alcance y cronograma del proyecto",
          status: "done",
          priority: "high",
          assignees: ["Juan Pérez", "María García", "Carlos Rodríguez", "Ana Martínez"],
          dueDate: "28 Sep, 2023",
          tags: ["Reunión"],
        },
        {
          id: "task-8",
          title: "Mapa del sitio",
          description: "Crear un mapa del sitio completo para el nuevo sitio web",
          status: "done",
          priority: "medium",
          assignees: ["Carlos Rodríguez"],
          dueDate: "1 Oct, 2023",
          tags: ["Planificación"],
        },
      ],
    },
  ])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskColumn, setNewTaskColumn] = useState("")
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium",
    assignees: [],
    tags: [],
  })
  
  // Desenvolver params como una Promise
  const resolvedParams = use(params as unknown as Promise<{ projectId: string; boardId: string }>)
  
  useEffect(() => {
    if (resolvedParams) {
      setProjectId(resolvedParams.projectId)
      setBoardId(resolvedParams.boardId)
    }
  }, [resolvedParams])
  
  if (!projectId || !boardId) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>
  }

  // Datos de ejemplo del proyecto y tablero
  const project = {
    id: projectId,
    name:
      projectId === "website-redesign"
        ? "Rediseño de Sitio Web"
        : projectId === "mobile-app"
          ? "App Móvil"
          : projectId === "marketing-campaign"
            ? "Campaña de Marketing"
            : "Proyecto",
    color: "blue",
  }

  const board = {
    id: boardId,
    name: boardId === "main" ? "Tablero Principal" : boardId === "backlog" ? "Backlog" : "Tablero",
  }

  const handleAddTask = (columnId: string) => {
    setIsAddingTask(true)
    setNewTaskColumn(columnId)
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      assignees: [],
      tags: [],
    })
  }

  const handleCreateTask = () => {
    if (!newTask.title) return

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description || "",
      status: newTaskColumn,
      priority: newTask.priority as "low" | "medium" | "high",
      assignees: newTask.assignees || [],
      dueDate: newTask.dueDate,
      tags: newTask.tags || [],
    }

    setColumns(
      columns.map((column) => {
        if (column.id === newTaskColumn) {
          return {
            ...column,
            tasks: [...column.tasks, task],
          }
        }
        return column
      }),
    )

    setIsAddingTask(false)
  }

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

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1">
          <div className="border-b bg-card">
            <div className="container py-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/projects/${projectId}`} className="text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full bg-blue-500`} />
                      <span className="text-sm text-muted-foreground">{project.name}</span>
                      <span className="text-sm text-muted-foreground">/</span>
                      <h1 className="text-xl font-bold text-primary-dark">{board.name}</h1>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar tablero</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar tareas..." className="w-full pl-8 md:w-[200px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filtrar</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Configuración</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-6">
            <div className="flex h-[calc(100vh-12rem)] gap-4 overflow-x-auto pb-4">
              {columns.map((column) => (
                <div key={column.id} className="flex-shrink-0 w-80">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{column.title}</h3>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {column.tasks.length}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Más opciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar Columna</DropdownMenuItem>
                        <DropdownMenuItem>Ordenar Tareas</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Eliminar Columna</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-col gap-3">
                    {column.tasks.map((task) => (
                      <Dialog key={task.id}>
                        <DialogTrigger asChild>
                          <Card className="cursor-pointer hover:shadow-md">
                            <CardHeader className="p-3 pb-0">
                              <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-2">
                              {task.description && (
                                <CardDescription className="text-xs line-clamp-2 mb-2">
                                  {task.description}
                                </CardDescription>
                              )}
                              <div className="flex flex-wrap gap-1 mb-2">
                                <span
                                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getPriorityColor(task.priority)}`}
                                >
                                  {getPriorityIcon(task.priority)}
                                  {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                                </span>
                                {task.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                  >
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
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>{task.title}</DialogTitle>
                            <DialogDescription>{task.description}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}
                              >
                                {getPriorityIcon(task.priority)}
                                Prioridad{" "}
                                {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                              </span>
                              {task.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs text-muted-foreground">Estado</Label>
                                <div className="font-medium">{column.title}</div>
                              </div>
                              {task.dueDate && (
                                <div>
                                  <Label className="text-xs text-muted-foreground">Fecha Límite</Label>
                                  <div className="font-medium">{task.dueDate}</div>
                                </div>
                              )}
                            </div>

                            <div>
                              <Label className="text-xs text-muted-foreground">Asignados</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {task.assignees.map((assignee, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1 text-xs"
                                  >
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                                      {assignee.charAt(0)}
                                    </div>
                                    {assignee}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Editar Tarea</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}

                    <Button
                      variant="outline"
                      className="justify-start gap-2 border-dashed"
                      onClick={() => handleAddTask(column.id)}
                    >
                      <Plus className="h-4 w-4" />
                      Añadir Tarea
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex-shrink-0 w-80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Añadir Columna</h3>
                </div>
                <Button variant="outline" className="w-full justify-center gap-2 border-dashed h-20">
                  <Plus className="h-4 w-4" />
                  Añadir Columna
                </Button>
              </div>
            </div>
          </div>

          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nueva Tarea</DialogTitle>
                <DialogDescription>
                  Añadir una nueva tarea a la columna {columns.find((c) => c.id === newTaskColumn)?.title}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Título de la tarea"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Prioridad</Label>
                  <div className="flex gap-2">
                    {[
                      { value: "low", label: "Baja" },
                      { value: "medium", label: "Media" },
                      { value: "high", label: "Alta" },
                    ].map((priority) => (
                      <Button
                        key={priority.value}
                        type="button"
                        variant={newTask.priority === priority.value ? "default" : "outline"}
                        className="flex-1"
                        onClick={() =>
                          setNewTask({ ...newTask, priority: priority.value as "low" | "medium" | "high" })
                        }
                      >
                        {priority.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Fecha Límite (Opcional)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateTask}>Crear Tarea</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}


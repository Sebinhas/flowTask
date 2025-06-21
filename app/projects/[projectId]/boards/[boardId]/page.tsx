"use client"

import { useEffect, useState, useCallback, use } from "react"
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
  Layers,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
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
import { getInfoBoard } from "@/api/services/projects/board"
import { createTask } from "@/api/services/projects/tasks"
import { toast } from "sonner"

interface BoardPageProps {
  params: Promise<{
    projectId: string
    boardId: string
  }>
}

interface BoardMember {
  id: string
  full_name: string
  email: string
  avatar: string | null
  BoardMember: {
    role: string
  }
}

interface Task {
  id: string
  title: string
  description: string
  priority: string
  status: string
  due_date: string
  position: number
  list_id: string
  is_active: boolean
  created_at: string
}

interface List {
  id: string
  name: string
  position: number
  board_id: string
  created_at: string
  tasks: Task[]
}

interface Board {
  id: string
  name: string
  description: string
  owner_id: string
  project_id: string
  visibility: string
  status: string
  created_at: string
  owner: {
    id: string
    full_name: string
    email: string
    avatar: string | null
  }
  boardMembers: BoardMember[]
  lists: List[]
}

export default function BoardPage({ params }: BoardPageProps) {
  const resolvedParams = use(params)
  const [board, setBoard] = useState<Board | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskColumn, setNewTaskColumn] = useState("")
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "media",
    due_date: "",
    assigned_users: [] as string[]
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    let isActive = true

    const fetchBoard = async () => {
      try {
        const boardData = await getInfoBoard(resolvedParams.boardId)
        if (isActive) {
          setBoard(boardData)
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : 'Error al cargar el tablero')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    fetchBoard()

    return () => {
      isActive = false
    }
  }, [resolvedParams.boardId, isMounted])

  const handleCreateTask = useCallback(async () => {
    if (!newTask.title.trim()) {
      toast.error("El título de la tarea es requerido")
      return
    }

    try {
      const taskData = {
        title: newTask.title,
        description: newTask.description,
        due_date: newTask.due_date || null,
        priority: newTask.priority,
        assigned_users: newTask.assigned_users
      }

      const createdTask = await createTask(newTaskColumn, taskData)
      
      setBoard(prevBoard => {
        if (!prevBoard) return prevBoard
        
        return {
          ...prevBoard,
          lists: prevBoard.lists.map(list => {
            if (list.id === newTaskColumn) {
              return {
                ...list,
                tasks: [...list.tasks, createdTask]
              }
            }
            return list
          })
        }
      })

      setNewTask({
        title: "",
        description: "",
        priority: "media",
        due_date: "",
        assigned_users: []
      })
      
      setIsAddingTask(false)
      toast.success("Tarea creada exitosamente")
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Error al crear la tarea"
      toast.error(errorMessage)
    }
  }, [newTask, newTaskColumn])

  const handleAddTask = useCallback((listId: string) => {
    setIsAddingTask(true)
    setNewTaskColumn(listId)
    setNewTask({
      title: "",
      description: "",
      priority: "media",
      due_date: "",
      assigned_users: []
    })
  }, [])

  const handleInputChange = useCallback((field: string, value: string) => {
    setNewTask(prev => ({ ...prev, [field]: value }))
  }, [])

  const handlePriorityChange = useCallback((priority: string) => {
    setNewTask(prev => ({ ...prev, priority }))
  }, [])

  if (!isMounted || loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r md:block">
            <DashboardSidebar />
          </aside>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <p>Cargando tablero...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error || !board) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r md:block">
            <DashboardSidebar />
          </aside>
          <main className="flex-1 p-6">
            <div className="flex flex-col items-center justify-center h-full">
              <Layers className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Error</h3>
              <p className="text-muted-foreground mb-4">{error || 'Tablero no encontrado'}</p>
              <Link href={`/projects/${resolvedParams.projectId}`}>
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al proyecto
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
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
                    <Link href={`/projects/${resolvedParams.projectId}`} className="text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-primary-dark">{board.name}</h1>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        board.visibility === 'public' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {board.visibility === 'public' ? 'Público' : 'Privado'}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        board.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {board.status === 'active' ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1">{board.description}</p>
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
              {board.lists.map((list) => (
                <div key={list.id} className="flex-shrink-0 w-80">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{list.name}</h3>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {list.tasks?.length || 0}
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
                        <DropdownMenuItem>Editar Lista</DropdownMenuItem>
                        <DropdownMenuItem>Ordenar Tareas</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Eliminar Lista</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-col gap-3">
                    {list.tasks && list.tasks.length > 0 ? (
                      list.tasks.map((task) => (
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
                                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                                    task.priority === 'alta' 
                                      ? 'bg-red-100 text-red-700'
                                      : task.priority === 'media'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {task.priority === 'alta' ? (
                                      <AlertCircle className="h-3 w-3" />
                                    ) : task.priority === 'media' ? (
                                      <Clock className="h-3 w-3" />
                                    ) : (
                                      <CheckCircle2 className="h-3 w-3" />
                                    )}
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                  </span>
                                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                                    task.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : task.status === 'in_progress'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {task.status === 'pending' ? 'Pendiente' : 
                                     task.status === 'in_progress' ? 'En Progreso' : 
                                     'Completado'}
                                  </span>
                                </div>
                              </CardContent>
                              <CardFooter className="p-3 pt-0 flex justify-between items-center">
                                {task.due_date && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(task.due_date).toLocaleDateString()}
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
                                <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                                  task.priority === 'alta' 
                                    ? 'bg-red-100 text-red-700'
                                    : task.priority === 'media'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  {task.priority === 'alta' ? (
                                    <AlertCircle className="h-3 w-3" />
                                  ) : task.priority === 'media' ? (
                                    <Clock className="h-3 w-3" />
                                  ) : (
                                    <CheckCircle2 className="h-3 w-3" />
                                  )}
                                  Prioridad {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                                <span className={`rounded-full px-2 py-1 text-xs ${
                                  task.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : task.status === 'in_progress'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  {task.status === 'pending' ? 'Pendiente' : 
                                   task.status === 'in_progress' ? 'En Progreso' : 
                                   'Completado'}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs text-muted-foreground">Estado</Label>
                                  <div className="font-medium">{list.name}</div>
                                </div>
                                {task.due_date && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Fecha Límite</Label>
                                    <div className="font-medium">
                                      {new Date(task.due_date).toLocaleDateString()}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Editar Tarea</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-20 rounded-md border-2 border-dashed">
                        <p className="text-sm text-muted-foreground">No hay tareas</p>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      className="justify-start gap-2 border-dashed"
                      onClick={() => {
                        handleAddTask(list.id)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Añadir Tarea
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex-shrink-0 w-80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Añadir Lista</h3>
                </div>
                <Button variant="outline" className="w-full justify-center gap-2 border-dashed h-20">
                  <Plus className="h-4 w-4" />
                  Añadir Lista
                </Button>
              </div>
            </div>
          </div>

          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nueva Tarea</DialogTitle>
                <DialogDescription>
                  Añadir una nueva tarea a la lista {board.lists.find((l) => l.id === newTaskColumn)?.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Título de la tarea"
                    value={newTask.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    value={newTask.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Prioridad</Label>
                  <div className="flex gap-2">
                    {[
                      { value: "baja", label: "Baja" },
                      { value: "media", label: "Media" },
                      { value: "alta", label: "Alta" },
                    ].map((priority) => (
                      <Button
                        key={priority.value}
                        type="button"
                        variant={newTask.priority === priority.value ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => handlePriorityChange(priority.value)}
                      >
                        {priority.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due_date">Fecha Límite (Opcional)</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => handleInputChange('due_date', e.target.value)}
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


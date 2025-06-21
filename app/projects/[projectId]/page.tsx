"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Edit, FileText, Layers, MoreHorizontal, Plus, Settings, Users, ArrowLeft, Search, Filter } from "lucide-react"
import { getProjectById, Board } from "@/api/services/projects/project"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProject } from "@/app/context/ProjectContext"
import { createBoard } from "@/api/services/projects/board"
import { toast } from "sonner"

interface Project {
  id: string
  name: string
  description: string
  category: string
  other_category: string | null
  color: string
  owner_id: string
  created_at: string
  projectBoards: Array<{
    id: string
    name: string
    tasks: number
    description?: string
    visibility: string
    status: string
  }>
}

export default function ProjectPage() {
  const params = useParams()
  const { currentProject, setCurrentProject, currentUser, isLoading: isUserLoading } = useProject()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false)
  const [newBoard, setNewBoard] = useState({
    name: "",
    description: "",
    visibility: "public"
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (params.projectId) {
          const projectData = await getProjectById(params.projectId as string)
          setCurrentProject(projectData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el proyecto')
      } finally {
        setLoading(false)
      }
    }

    if (!isUserLoading) {
      fetchProject()
    }
  }, [params.projectId, setCurrentProject, isUserLoading])

  const handleCreateBoard = async () => {
    try {
      if (!currentProject) {
        throw new Error('No hay proyecto seleccionado')
      }

      if (!currentUser) {
        throw new Error('No has iniciado sesión. Por favor, inicia sesión para crear un tablero.')
      }

      const boardData = {
        ...newBoard,
        project_id: currentProject.id,
        owner_id: currentUser.id
      }

      const createdBoard = await createBoard(boardData)
      
      // Actualizar el proyecto con el nuevo tablero
      const updatedProject = await getProjectById(currentProject.id)
      setCurrentProject(updatedProject)
      
      setIsCreateBoardModalOpen(false)
      setNewBoard({
        name: "",
        description: "",
        visibility: "public"
      })
      
      toast.success('Tablero creado exitosamente')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Error al crear el tablero')
    }
  }

  if (isUserLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r md:block">
            <DashboardSidebar />
          </aside>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <p>Cargando...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error || !currentProject) {
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
              <p className="text-muted-foreground mb-4">{error || 'Proyecto no encontrado'}</p>
              <Link href="/projects">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a proyectos
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
                    <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: currentProject.color }} />
                    <h1 className="text-2xl font-bold text-primary-dark">{currentProject.name}</h1>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar proyecto</span>
                    </Button>
                  </div>
                  <p className="text-muted-foreground">{currentProject.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    Invitar
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Configuración</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Más</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-6">
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="boards">Tableros</TabsTrigger>
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
                <TabsTrigger value="files">Archivos</TabsTrigger>
              </TabsList>
              
              <div className="container py-6">
                <TabsContent value="overview" className="mt-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Estado</CardTitle>
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Estado:</span>
                          <span className="text-sm font-medium">{currentProject.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Creado:</span>
                          <span className="text-sm font-medium">
                            {new Date(currentProject.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Tareas:</span>
                          <span className="text-sm font-medium">
                            {currentProject.projectBoards.reduce((total, board) => total + board.tasks, 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Tableros:</span>
                          <span className="text-sm font-medium">{currentProject.projectBoards.length}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Tareas</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {currentProject.projectBoards.reduce((total, board) => total + board.tasks, 0)}
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{
                              width: `${Math.round(((currentProject.projectBoards.reduce((total, board) => total + board.tasks, 0) / (currentProject.projectBoards.length * 10)) * 100))}%`,
                            }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {Math.round(((currentProject.projectBoards.reduce((total, board) => total + board.tasks, 0) / (currentProject.projectBoards.length * 10)) * 100))}% completado
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Equipo</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{currentProject.projectBoards.length}</div>
                        {currentProject.projectBoards && currentProject.projectBoards.length > 0 && (
                          <div className="mt-2 flex -space-x-2">
                            {currentProject.projectBoards.slice(0, 5).map((board) => (
                              <div
                                key={board.id}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-white ring-2 ring-background"
                              >
                                {board.name.charAt(0)}
                              </div>
                            ))}
                            {currentProject.projectBoards.length > 5 && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 ring-2 ring-background">
                                +{currentProject.projectBoards.length - 5}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Fecha Límite</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{currentProject.projectBoards.length > 0 ? "A tiempo" : "No definida"}</div>
                        {currentProject.projectBoards.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Última actualización: {new Date(currentProject.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Miembros del Equipo</CardTitle>
                        <CardDescription>Personas trabajando en este proyecto</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {currentProject.projectBoards.map((board) => (
                            <div key={board.id} className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                {board.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium leading-none">{board.name}</p>
                                <p className="text-sm text-muted-foreground">{board.tasks} tareas</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Mensaje
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                        <CardDescription>Últimas actualizaciones en este proyecto</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              user: "María García",
                              action: "completó la tarea",
                              target: "Actualizar diseño de página principal",
                              time: "hace 2 horas",
                            },
                            {
                              user: "Carlos Rodríguez",
                              action: "añadió un comentario en",
                              target: "Menú de navegación",
                              time: "hace 5 horas",
                            },
                            {
                              user: "Juan Pérez",
                              action: "creó la tarea",
                              target: "Implementar formulario de contacto",
                              time: "Ayer",
                            },
                            {
                              user: "Ana Martínez",
                              action: "subió el archivo",
                              target: "Conceptos de logo.pdf",
                              time: "Ayer",
                            },
                            {
                              user: "David López",
                              action: "se unió al proyecto",
                              target: "",
                              time: "hace 2 días",
                            },
                          ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Clock className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm leading-none">
                                  <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                                  {activity.target && <span className="font-semibold">{activity.target}</span>}
                                </p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="boards" className="mt-0">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-black">Tableros del Proyecto</h2>
                      <Button className="gap-2" onClick={() => setIsCreateBoardModalOpen(true)}>
                        <Plus className="h-4 w-4" />
                        Nuevo Tablero
                      </Button>
                    </div>

                    <div className="mt-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentProject.projectBoards.map((board: any) => (
                          <Link
                            key={board.id}
                            href={`/projects/${currentProject?.id}/boards/${board.id}`}
                            className="block"
                          >
                            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold text-lg text-gray-900">{board.name}</h3>
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {board.description || "Sin descripción"}
                                  </p>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  board.visibility === 'public' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {board.visibility === 'public' ? 'Público' : 'Privado'}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    board.status === 'active' 
                                      ? 'bg-emerald-100 text-emerald-700' 
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {board.status === 'active' ? 'Activo' : 'Inactivo'}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Clock className="h-4 w-4" />
                                  <span>Reciente</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="calendar" className="mt-0">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-primary-dark">Calendario del Proyecto</h2>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Añadir Evento
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex h-[400px] items-center justify-center rounded-md border-2 border-dashed">
                          <div className="flex flex-col items-center text-center">
                            <Calendar className="h-10 w-10 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Vista de Calendario</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Ver y gestionar fechas límite y hitos del proyecto
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="mt-0">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-primary-dark">Archivos del Proyecto</h2>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Subir Archivo
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex h-[400px] items-center justify-center rounded-md border-2 border-dashed">
                          <div className="flex flex-col items-center text-center">
                            <FileText className="h-10 w-10 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Repositorio de Archivos</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Subir y gestionar archivos y documentos del proyecto
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>

      <Dialog open={isCreateBoardModalOpen} onOpenChange={setIsCreateBoardModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Tablero</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del Tablero</Label>
              <Input
                id="name"
                value={newBoard.name}
                onChange={(e) => setNewBoard({ ...newBoard, name: e.target.value })}
                placeholder="Ingrese el nombre del tablero"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                className="resize-none"
                id="description"
                value={newBoard.description}
                onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
                placeholder="Ingrese la descripción del tablero"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visibility">Visibilidad</Label>
              <Select
                value={newBoard.visibility}
                onValueChange={(value) => setNewBoard({ ...newBoard, visibility: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la visibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Público</SelectItem>
                  <SelectItem value="private">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateBoardModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateBoard}>
              Crear Tablero
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


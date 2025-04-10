import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Edit, FileText, Layers, MoreHorizontal, Plus, Settings, Users, ArrowLeft, Search, Filter } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projectId = params.projectId

  // Datos de ejemplo del proyecto
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
    description: "Rediseñar el sitio web de la empresa con un aspecto moderno y UX mejorada",
    status: "En Progreso",
    members: [
      { id: "1", name: "Juan Pérez", role: "Gerente de Proyecto", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "María García", role: "Diseñadora", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Carlos Rodríguez", role: "Desarrollador", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Ana Martínez", role: "Redactora de Contenido", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "David López", role: "Tester de QA", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tasks: 24,
    completedTasks: 10,
    dueDate: "15 Oct, 2023",
    startDate: "1 Ago, 2023",
    tags: ["Diseño", "Desarrollo"],
    color: "blue",
    boards: [
      { id: "main", name: "Tablero Principal", tasks: 18 },
      { id: "backlog", name: "Backlog", tasks: 6 },
    ],
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
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <h1 className="text-2xl font-bold text-primary-dark">{project?.name}</h1>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar proyecto</span>
                    </Button>
                  </div>
                  <p className="text-muted-foreground">{project?.description}</p>
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
                        <div className="text-2xl font-bold">{project.status}</div>
                        <p className="text-xs text-muted-foreground">Iniciado el {project.startDate}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Tareas</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {project.completedTasks}/{project.tasks}
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{
                              width: `${Math.round((project.completedTasks / project.tasks) * 100)}%`,
                            }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {Math.round((project.completedTasks / project.tasks) * 100)}% completado
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Equipo</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{project.members.length}</div>
                        <div className="mt-2 flex -space-x-2">
                          {project.members.slice(0, 5).map((member) => (
                            <div
                              key={member.id}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-white ring-2 ring-background"
                            >
                              {member.name.charAt(0)}
                            </div>
                          ))}
                          {project.members.length > 5 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 ring-2 ring-background">
                              +{project.members.length - 5}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Fecha Límite</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{project.dueDate}</div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(project.dueDate) > new Date() ? "A tiempo" : "Atrasado"}
                        </p>
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
                          {project.members.map((member) => (
                            <div key={member.id} className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                {member.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium leading-none">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
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
                      <h2 className="text-xl font-semibold text-primary-dark">Tableros del Proyecto</h2>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Tablero
                      </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {project.boards.map((board) => (
                        <Link key={board.id} href={`/projects/${projectId}/boards/${board.id}`}>
                          <Card className="h-full transition-all hover:shadow-md">
                            <CardHeader>
                              <CardTitle>{board.name}</CardTitle>
                              <CardDescription>{board.tasks} tareas</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed">
                                <Layers className="h-8 w-8 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}

                      <Card className="h-full border-2 border-dashed">
                        <CardHeader>
                          <CardTitle className="text-muted-foreground">Crear Nuevo Tablero</CardTitle>
                        </CardHeader>
                        <CardContent className="flex h-24 items-center justify-center">
                          <Button variant="ghost" className="h-12 w-12 rounded-full">
                            <Plus className="h-6 w-6" />
                            <span className="sr-only">Crear tablero</span>
                          </Button>
                        </CardContent>
                      </Card>
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
    </div>
  )
}


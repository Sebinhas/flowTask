import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Filter, Layers, Plus, Search, Star, Users } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: "website-redesign",
      name: "Rediseño de Sitio Web",
      description: "Rediseñar el sitio web de la empresa con un aspecto moderno y UX mejorada",
      status: "En Progreso",
      members: 5,
      tasks: 24,
      completedTasks: 10,
      dueDate: "15 Oct, 2023",
      tags: ["Diseño", "Desarrollo"],
      color: "blue",
    },
    {
      id: "mobile-app",
      name: "App Móvil",
      description: "Desarrollar una aplicación móvil para plataformas iOS y Android",
      status: "Planificación",
      members: 4,
      tasks: 18,
      completedTasks: 3,
      dueDate: "1 Dic, 2023",
      tags: ["Móvil", "Desarrollo"],
      color: "green",
    },
    {
      id: "marketing-campaign",
      name: "Campaña de Marketing",
      description: "Planificar y ejecutar una campaña de marketing para el lanzamiento del nuevo producto",
      status: "No Iniciado",
      members: 3,
      tasks: 12,
      completedTasks: 0,
      dueDate: "10 Nov, 2023",
      tags: ["Marketing", "Contenido"],
      color: "purple",
    },
    {
      id: "user-research",
      name: "Investigación de Usuarios",
      description: "Realizar investigación de usuarios para recopilar información para mejoras del producto",
      status: "En Progreso",
      members: 2,
      tasks: 8,
      completedTasks: 5,
      dueDate: "5 Oct, 2023",
      tags: ["Investigación", "UX"],
      color: "orange",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Progreso":
        return "bg-blue-100 text-blue-800"
      case "Planificación":
        return "bg-yellow-100 text-yellow-800"
      case "No Iniciado":
        return "bg-gray-100 text-gray-800"
      case "Completado":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500"
      case "green":
        return "bg-green-500"
      case "purple":
        return "bg-purple-500"
      case "orange":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary-dark">Proyectos</h1>
                <p className="text-muted-foreground">Gestiona y organiza tus proyectos</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Proyecto
              </Button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar proyectos..." className="w-full pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrar</span>
              </Button>
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4" />
                <span className="sr-only">Favoritos</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getColorClass(project.color)}`} />
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">
                            {Math.round((project.completedTasks / project.tasks) * 100)}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{
                              width: `${Math.round((project.completedTasks / project.tasks) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {project.members}
                      </div>
                      <div className="flex items-center gap-1">
                        <Layers className="h-4 w-4" />
                        {project.completedTasks}/{project.tasks}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {project.dueDate}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


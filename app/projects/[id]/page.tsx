"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Layers } from "lucide-react"
import Link from "next/link"
import { Project } from "@/api/services/projects/project"
import { getProjectById } from "@/api/services/projects/project"
import { Toaster } from "sonner"

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (params.id) {
          const projectData = await getProjectById(params.id as string)
          setProject(projectData)
        }
      } catch (error) {
        console.error("Error al cargar el proyecto:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r md:block">
            <DashboardSidebar />
          </aside>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <p>Cargando proyecto...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!project) {
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
              <h3 className="text-lg font-semibold">Proyecto no encontrado</h3>
              <p className="text-muted-foreground mb-4">El proyecto que buscas no existe o no tienes acceso a él</p>
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
      <Toaster position="top-right"/>
      <DashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-primary-dark">{project.name}</h1>
                <p className="text-muted-foreground">Detalles del proyecto</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Información del proyecto</CardTitle>
                  <CardDescription>Detalles generales del proyecto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: project.color }} />
                    <span className="font-medium">Color del proyecto</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Descripción</span>
                    <p className="mt-1">{project.description}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Categoría</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {project.category}
                      </span>
                      {project.other_category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {project.other_category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Creado el {new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tableros del proyecto</CardTitle>
                  <CardDescription>Organiza tus tareas en tableros</CardDescription>
                </CardHeader>
                <CardContent>
                  {project.projectBoards && project.projectBoards.length > 0 ? (
                    <div className="space-y-2">
                      {project.projectBoards.map((board: any) => (
                        <div key={board.id} className="p-3 border rounded-md">
                          <h3 className="font-medium">{board.name}</h3>
                          <p className="text-sm text-muted-foreground">{board.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <Layers className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No hay tableros creados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 
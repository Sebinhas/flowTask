"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Layers, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Board {
  id: string
  name: string
  description?: string
  tasks_count: number
}

export default function ProjectBoardsPage() {
  const params = useParams()
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${params.projectId}/boards`)
        if (!response.ok) {
          throw new Error('Error al cargar los tableros')
        }
        const data = await response.json()
        setBoards(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los tableros')
      } finally {
        setLoading(false)
      }
    }

    if (params.projectId) {
      fetchBoards()
    }
  }, [params.projectId])

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
              <p>Cargando tableros...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error) {
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
              <p className="text-muted-foreground mb-4">{error}</p>
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
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/projects">
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-primary-dark">Tableros</h1>
                  <p className="text-muted-foreground">Gestiona los tableros de tu proyecto</p>
                </div>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Tablero
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {boards.length > 0 ? (
                boards.map((board) => (
                  <Link key={board.id} href={`/projects/${params.projectId}/boards/${board.id}`}>
                    <Card className="h-full transition-all hover:shadow-md">
                      <CardHeader>
                        <CardTitle>{board.name}</CardTitle>
                        <CardDescription>{board.tasks_count} tareas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed">
                          <Layers className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No hay tableros</h3>
                  <p className="text-muted-foreground">Crea un nuevo tablero para comenzar</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 
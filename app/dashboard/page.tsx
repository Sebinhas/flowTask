'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Activity, Calendar, CheckCircle2, Clock, Plus, Users } from "lucide-react"
import { useUserStore } from "@/lib/store/userStore";
import { Toaster } from "sonner";
import useDashboard from "./useDashboard";
import { useEffect } from "react"
export default function DashboardPage() {
  const { user } = useUserStore();
  const {  } = useDashboard()
  
  

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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-primary-dark">Panel</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total de Proyectos</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">8 para hoy</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Miembros del Equipo</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">2 invitaciones pendientes</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Actividad de tu equipo en los últimos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        user: "Juan Pérez",
                        action: "completó la tarea",
                        target: "Actualizar diseño de página principal",
                        project: "Rediseño de Sitio Web",
                        time: "hace 2 horas",
                      },
                      {
                        user: "María García",
                        action: "añadió un comentario en",
                        target: "Integración de API",
                        project: "App Móvil",
                        time: "hace 5 horas",
                      },
                      {
                        user: "Carlos Rodríguez",
                        action: "creó la tarea",
                        target: "Crear recursos para redes sociales",
                        project: "Campaña de Marketing",
                        time: "Ayer",
                      },
                      {
                        user: "Ana Martínez",
                        action: "movió la tarea",
                        target: "Autenticación de usuarios",
                        project: "App Móvil",
                        time: "Ayer",
                      },
                      {
                        user: "Tú",
                        action: "completaste la tarea",
                        target: "Finalizar paleta de colores",
                        project: "Rediseño de Sitio Web",
                        time: "hace 2 días",
                      },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                            <span className="font-semibold">{activity.target}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">Proyecto: {activity.project}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximas Fechas Límite</CardTitle>
                  <CardDescription>Tareas que vencen en los próximos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        task: "Finalizar wireframes",
                        project: "Rediseño de Sitio Web",
                        dueDate: "Mañana",
                        priority: "Alta",
                      },
                      {
                        task: "Pruebas de usuario",
                        project: "App Móvil",
                        dueDate: "En 2 días",
                        priority: "Media",
                      },
                      {
                        task: "Creación de contenido",
                        project: "Campaña de Marketing",
                        dueDate: "En 3 días",
                        priority: "Media",
                      },
                      {
                        task: "Revisión de stakeholders",
                        project: "Rediseño de Sitio Web",
                        dueDate: "En 5 días",
                        priority: "Alta",
                      },
                    ].map((deadline, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
                        <div
                          className={`rounded-full p-2 ${
                            deadline.priority === "Alta" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{deadline.task}</p>
                          <p className="text-sm text-muted-foreground">{deadline.project}</p>
                        </div>
                        <div className="text-xs font-medium">{deadline.dueDate}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


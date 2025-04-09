import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, Plus, Search, Shield, User, Users } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@ejemplo.com",
      role: "Propietario",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 12,
    },
    {
      id: "2",
      name: "María García",
      email: "maria@ejemplo.com",
      role: "Administrador",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 8,
    },
    {
      id: "3",
      name: "Carlos Rodríguez",
      email: "carlos@ejemplo.com",
      role: "Miembro",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 5,
    },
    {
      id: "4",
      name: "Ana Martínez",
      email: "ana@ejemplo.com",
      role: "Miembro",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 7,
    },
    {
      id: "5",
      name: "David López",
      email: "david@ejemplo.com",
      role: "Miembro",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 3,
    },
  ]

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "Propietario":
        return "bg-purple-100 text-purple-800"
      case "Administrador":
        return "bg-blue-100 text-blue-800"
      case "Miembro":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Propietario":
        return <Shield className="h-3 w-3" />
      case "Administrador":
        return <Shield className="h-3 w-3" />
      case "Miembro":
        return <User className="h-3 w-3" />
      default:
        return <User className="h-3 w-3" />
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
                <h1 className="text-3xl font-bold text-primary-dark">Equipo</h1>
                <p className="text-muted-foreground">Gestiona los miembros de tu equipo y su acceso</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Invitar Miembro
              </Button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar miembros del equipo..." className="w-full pl-8" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Miembros del Equipo</CardTitle>
                <CardDescription>Gestiona los miembros de tu equipo y sus roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 items-center justify-between gap-4 sm:justify-end">
                        <div className="flex items-center gap-4">
                          <span
                            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${getRoleBadgeClass(member.role)}`}
                          >
                            {getRoleIcon(member.role)}
                            {member.role}
                          </span>
                          <div className="hidden text-sm text-muted-foreground md:block">
                            {member.projects} proyectos
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Gestionar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invitaciones Pendientes</CardTitle>
                <CardDescription>Gestiona tus invitaciones de equipo pendientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <Users className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No hay invitaciones pendientes</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Invita a miembros del equipo para colaborar en tus proyectos
                  </p>
                  <Button className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Invitar Miembro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}


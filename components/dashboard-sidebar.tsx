"use client"

import type React from "react"
import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Inbox, Layers, LayoutDashboard, Plus, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col gap-2", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    color: ""
  })
  
  const mainNavItems = [
    {
      href: "/dashboard",
      title: "Panel",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/projects",
      title: "Proyectos",
      icon: <Layers className="h-4 w-4" />,
    },
    {
      href: "/calendar",
      title: "Calendario",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: "/inbox",
      title: "Bandeja de entrada",
      icon: <Inbox className="h-4 w-4" />,
    },
  ]

  const projectNavItems = [
    {
      href: "/projects/website-redesign",
      title: "Rediseño de Sitio Web",
      icon: <div className="h-2 w-2 rounded-full bg-blue-500" />,
    },
    {
      href: "/projects/mobile-app",
      title: "App Móvil",
      icon: <div className="h-2 w-2 rounded-full bg-green-500" />,
    },
    {
      href: "/projects/marketing-campaign",
      title: "Campaña de Marketing",
      icon: <div className="h-2 w-2 rounded-full bg-purple-500" />,
    },
  ]

  const bottomNavItems = [
    {
      href: "/team",
      title: "Equipo",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/settings",
      title: "Configuración",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para crear el proyecto
    console.log("Nuevo proyecto:", formData)
    // Resetear el formulario
    setFormData({
      name: "",
      description: "",
      category: "",
      color: ""
    })
    setOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (value: string, id: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  return (
    <div className="flex h-full flex-col border-r bg-card">
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="justify-start gap-2 text-sm">
                  <Plus className="h-4 w-4" />
                  Nuevo Proyecto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
                  <DialogDescription>
                    Completa la información para crear un nuevo proyecto.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateProject}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre del Proyecto</Label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ingresa el nombre del proyecto" 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea 
                        id="description" 
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe brevemente el proyecto" 
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select onValueChange={(value) => handleSelectChange(value, "category")}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Desarrollo Web</SelectItem>
                          <SelectItem value="mobile">Desarrollo Móvil</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="design">Diseño</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="color">Color</Label>
                      <Select onValueChange={(value) => handleSelectChange(value, "color")}>
                        <SelectTrigger id="color">
                          <SelectValue placeholder="Selecciona un color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-blue-500" />
                              <span>Azul</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="green">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-green-500" />
                              <span>Verde</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="purple">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-purple-500" />
                              <span>Morado</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="orange">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-orange-500" />
                              <span>Naranja</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="red">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-red-500" />
                              <span>Rojo</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Crear Proyecto</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="px-3 text-xs font-medium text-muted-foreground">Principal</h3>
            <SidebarNav items={mainNavItems} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="px-3 text-xs font-medium text-muted-foreground">Proyectos</h3>
            <SidebarNav items={projectNavItems} />
          </div>
        </div>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <SidebarNav items={bottomNavItems} />
      </div>
    </div>
  )
}


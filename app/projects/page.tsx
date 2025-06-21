"use client"

import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Filter, Layers, Plus, Search, Star, Users, Loader2 } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useProject from "./useProject"
import { useForm } from "react-hook-form"
import { Toaster } from "sonner"


interface ProjectFormData {
  name: string
  description: string
  category: string
  color: string
  otherCategory?: string
}

export default function ProjectsPage() {
  const [open, setOpen] = useState(false)
  const { createNewProject, projects, isLoading } = useProject()
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProjectFormData>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      color: "",
      otherCategory: ""
    }
  })

  const category = watch("category")

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await createNewProject({
        ...data,
        category: data.category === "other" ? data.otherCategory : data.category
      })
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectChange = (value: string) => {
    setValue("category", value)
  }

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
      <Toaster position="top-right"/>
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
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nombre del Proyecto</Label>
                        <Input 
                          id="name" 
                          className={errors.name ? "border-red-500" : ""}
                          {...register("name", { required: true })}
                          placeholder="Ingresa el nombre del proyecto" 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea 
                          id="description" 
                          className={`min-h-[80px] resize-none ${errors.description ? "border-red-500" : ""}`}
                          {...register("description", { required: true })}
                          placeholder="Describe brevemente el proyecto" 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Select onValueChange={handleSelectChange}>
                          <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
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
                        {category === "other" && (
                          <Input
                            id="otherCategory"
                            placeholder="Especifica la categoría"
                            className={errors.otherCategory ? "border-red-500" : ""}
                            {...register("otherCategory", { required: category === "other" })}
                          />
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="color">Color (formato hexadecimal)</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="color" 
                            type="text"
                            className={`flex-1 ${errors.color ? "border-red-500" : ""}`}
                            {...register("color", { 
                              required: true,
                              pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                            })}
                            placeholder="#000000"
                          />
                          <div 
                            className="h-10 w-10 rounded border" 
                            style={{ backgroundColor: watch("color") || '#ffffff' }}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 
                          <Loader2 className="h-4 w-4 animate-spin" />
                        : 
                          "Crear Proyecto"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
              {Array.isArray(projects) && projects.length > 0 ? (
                [...projects]
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: project.color }} />
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {project.category}
                            </span>
                            {project.other_category && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                {project.other_category}
                              </span>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(project.created_at).toLocaleDateString()}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No hay proyectos</h3>
                  <p className="text-muted-foreground">Crea un nuevo proyecto para comenzar</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


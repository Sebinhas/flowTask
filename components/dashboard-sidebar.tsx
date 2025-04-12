"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
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

interface ProjectFormData {
  name: string
  description: string
  category: string
  color: string
  otherCategory?: string
}

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
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProjectFormData>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      color: "",
      otherCategory: ""
    }
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

  return (
    <div className="flex h-full flex-col border-r bg-card">
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="flex flex-col gap-6">
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


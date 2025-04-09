// Tipos de Usuario
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "owner" | "admin" | "member" | "guest"
}

// Tipos de Proyecto
export interface Project {
  id: string
  name: string
  description: string
  status: "No Iniciado" | "Planificación" | "En Progreso" | "En Espera" | "Completado"
  members: User[]
  tasks: Task[]
  boards: Board[]
  createdAt: string
  updatedAt: string
  startDate?: string
  dueDate?: string
  tags: string[]
  color: string
}

// Tipos de Tablero
export interface Board {
  id: string
  name: string
  description?: string
  projectId: string
  columns: Column[]
  createdAt: string
  updatedAt: string
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
  order: number
}

// Tipos de Tarea
export interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: "low" | "medium" | "high"
  assignees: string[]
  dueDate?: string
  tags: string[]
  attachments?: Attachment[]
  comments?: Comment[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: string
  uploadedBy: string
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  createdBy: string
  taskId: string
}


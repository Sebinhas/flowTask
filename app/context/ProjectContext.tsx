"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  id: string
  full_name: string
  email: string
  avatar: string | null
  is_active: boolean
  created_at: string
}

interface Project {
  id: string
  name: string
  description: string
  category: string
  other_category: string | null
  color: string
  owner_id: string
  created_at: string
  projectBoards: Array<{
    id: string
    name: string
    tasks: number
  }>
}

interface ProjectContextType {
  currentProject: Project | null
  setCurrentProject: (project: Project | null) => void
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  isLoading: boolean
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedState = localStorage.getItem('user-storage')
        if (storedState) {
          const parsedState = JSON.parse(storedState)
          if (parsedState?.state?.user) {
            setCurrentUser(parsedState.state.user)
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject, currentUser, setCurrentUser, isLoading }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
} 
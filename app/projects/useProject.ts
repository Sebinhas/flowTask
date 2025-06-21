import { createProject, getProjectsByUserId } from "@/api/services/projects/project"
import { useUserStore } from "@/lib/store/userStore"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "sonner"
import { getProjectByOwnerId } from "@/api/services/projects/project"

const useProject = () => {
  const [projects, setProjects] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUserStore()

  useEffect(() => {
    getProjects()
    console.log('user', user)
  }, [user])

  useEffect(() => {
    console.log('projects', projects)
  }, [projects])
  
  const getProjects = async () => {
    try {
      const userId = user?.id
      if(userId){
        console.log('userId', userId)
        const response = await getProjectByOwnerId(userId as string)
        console.log('response', response)
        setProjects(response)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const createNewProject = async (project: any) => {
   try {
    const projectData = {
      ...project,
      owner_id: user?.id as string
    }
    setIsLoading(true)
    const response = await createProject(projectData)
    if(response){
      setIsLoading(false)
      toast.success("Proyecto creado correctamente")
      await getProjects()
    }
    setIsLoading(false)
   } catch (error) {
    console.log(error)
    setIsLoading(false)
   }
  }

  return {
    createNewProject,
    projects,
    isLoading
  }
}

export default useProject

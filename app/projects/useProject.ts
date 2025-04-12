import { createProject, getProjectsByUserId } from "@/api/services/projects/project"
import { useUserStore } from "@/lib/store/userStore"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "sonner"
import { getProjectByOwnerId } from "@/api/services/projects/project"

const useProject = () => {
  const [projects, setProjects] = useState<any>()
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
        const response = await getProjectByOwnerId(userId as string)
        setProjects(response)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const createNewProject = async (project: any) => {
   try {
    console.log(user?.id)
    const projectData = {
      ...project,
      owner_id: user?.id as string
    }
    const response = await createProject(projectData)
    if(response){
      toast.success("Proyecto creado correctamente")
      await getProjects()
    }
    
   } catch (error) {
    console.log(error)
   }
  }

  return {
    createNewProject,
    projects
  }
}

export default useProject

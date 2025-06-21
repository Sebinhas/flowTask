import { useParams } from "next/navigation"

export const usePage = () => {
  const { projectId } = useParams()
  console.log(projectId)
}
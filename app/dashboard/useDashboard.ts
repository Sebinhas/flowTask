import { getUserById } from "@/api/services/users/users"
import { useUserStore } from "@/lib/store/userStore"
import { useEffect, useState } from "react"

const useDashboard = () => {
  const { user, setUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('user', user)
  }, [])

  return {
    user,
    isLoading
  }
}

export default useDashboard
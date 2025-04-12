import { LoginData, LoginResponse } from "@/api/services/auth/login";
import { useState } from "react";
import { loginUser } from "@/api/services/auth/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const login = async (data: LoginData): Promise<LoginResponse> => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loginUser(data)
      
      // Solo redirigimos si la respuesta incluye un usuario
      if (response.user) {
        toast.success(response.message)
        router.push("/dashboard")
        return response
      }
      
      // Si no hay usuario, mostramos el error pero no redirigimos
      setError(response.message)
      toast.error(response.message)
      return response
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al iniciar sesión"
      setError(errorMessage)
      toast.error(errorMessage)
      
      return {
        message: errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  };

  return {
    login,
    isLoading,
    error
  }
};

export default useLogin;

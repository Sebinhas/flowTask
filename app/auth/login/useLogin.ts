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
    try {
      const response = await loginUser(data)
      if(response.user){
        toast.success(response.message)
        router.push("/dashboard")
      } else {
        toast.error(response.message)
      }
      return response;
    } catch (error: any) {
      const errorResponse: LoginResponse = {
        message: error.response?.data?.message || "Error al iniciar sesión"
      };
      toast.error(errorResponse.message);
      return errorResponse;
    } finally {
      setIsLoading(false)
    }
  };

  return {
    login
  }
};

export default useLogin;

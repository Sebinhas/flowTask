import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/api/services/auth/login';
import { getUserById } from '@/api/services/users/users';
import { useUserStore } from '@/lib/store/userStore';
import { toast } from 'sonner';
import { User } from '@/types/user';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const passwordRequirements = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      
      // Intentar login
      const loginResponse = await loginUser(data);
      console.log('Login response:', loginResponse);
      
      if (loginResponse.status === "error") {
        throw new Error(loginResponse.data.message);
      }

      // Guardar usuario en el store
      const userInfo = loginResponse.data.user;
      setUser(userInfo);
            
      // Mostrar mensaje de éxito
      toast.success('¡Bienvenido!... espere un momento');
      
      // Redirigir al dashboard
      router.push('/dashboard');

      return loginResponse;
      
    } catch (error: any) {
      console.error('Error en login:', error);
      toast.error(error.message || 'Error al iniciar sesión');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    showPassword,
    setShowPassword,
    passwordRequirements
  };
};

export default useLogin;

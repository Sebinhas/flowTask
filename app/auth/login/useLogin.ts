import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/api/services/auth/login';
import { getUserById } from '@/api/services/users/users';
import { useUserStore } from '@/lib/store/userStore';
import { toast } from 'sonner';
import { User } from '@/types/user';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const login = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      
      // Intentar login
      const loginResponse = await loginUser(data);
      console.log('Login response:', loginResponse);
      
      if (!loginResponse.user) {
        throw new Error(loginResponse.message);
      }

      // Guardar usuario en el store
      const userInfo = loginResponse.user;
      setUser(userInfo);
      
      // Verificar que el usuario se guardó
      const storedUser = useUserStore.getState().user;
      console.log('Usuario en store después de guardar:', storedUser);
      
      if (!storedUser) {
        throw new Error('No se pudo guardar el usuario en el store');
      }
      
      // Mostrar mensaje de éxito
      toast.success('¡Bienvenido!');
      
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
    isLoading
  };
};

export default useLogin;

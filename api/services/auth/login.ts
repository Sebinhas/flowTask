import axiosInstance from '../../config/axios';

// Interfaces para el servicio de login
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  user?: {
    id: string;
    full_name: string;
    email: string;
    avatar: string | null;
    is_active: boolean;
    created_at: string;
  };
  token?: string;
}

export const loginUser = async (data: LoginData): Promise<any> => {
  try {
    // Realiza la petición al endpoint de login
    const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
    return response;
  } catch (error: any) {
    // Si hay un error, devolver un objeto con formato similar al de éxito pero con el mensaje de error
    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
    return {
      message: errorMessage,
    };
  }
};
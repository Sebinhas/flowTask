import axiosInstance from '../../config/axios';

// Interfaces para el servicio de login
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
    avatar: string | null;
    is_active: boolean;
    created_at: string;
  };
  token?: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    // Realiza la petición al endpoint de login
    const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
    
    // Si la petición fue exitosa y hay un token en la respuesta, guárdalo
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    // Si hay un error, devolver un objeto con formato similar al de éxito pero con el mensaje de error
    return {
      message: error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.',
    };
  }
};
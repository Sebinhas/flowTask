import axiosInstance from '../../config/axios';

// Interfaces para el servicio de registro
export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
  token?: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    // Realiza la petición al endpoint de registro
    const response = await axiosInstance.post<RegisterResponse>('auth/register', data);
    
    // Si la petición fue exitosa y hay un token en la respuesta, guárdalo
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    // Si hay un error, devolver un objeto con formato similar al de éxito pero con el mensaje de error
    return {
      success: false,
      message: error.response?.data?.message || 'Error al registrar usuario. Inténtalo nuevamente.',
    };
  }
};

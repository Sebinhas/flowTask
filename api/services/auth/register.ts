import axiosInstance from '../../config/axios';

// Interfaces para el servicio de registro
export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
  token?: string;
}

export const registerUser = async (data: RegisterData): Promise<any> => {
  try {
    const response = await axiosInstance.post<RegisterResponse>('/auth/register', data);
    return response;
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.message || 'Error al registrar usuario. Inténtalo nuevamente.',
    };
  }
};

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Configuración base para todas las peticiones
const config: AxiosRequestConfig = {
  baseURL: 'https://30d3-200-122-210-2.ngrok-free.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Crear instancia de axios con la configuración
const axiosInstance: AxiosInstance = axios.create(config);

// Interceptor de peticiones
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtener token del localStorage (si existe)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // Si hay token, añadirlo a los headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Procesar respuestas exitosas si es necesario
    return response;
  },
  (error) => {
    // Manejar errores de respuesta
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status } = error.response;
      
      // Si el token ha expirado o es inválido (401)
      if (status === 401) {
        // Limpiar token y redirigir a login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // Redirigir a la página de login
          window.location.href = '/login';
        }
      }
      
      // Si hay un error de permisos (403)
      if (status === 403) {
        console.error('No tienes permisos para realizar esta acción');
      }
      
      // Si hay un error de servidor (500)
      if (status >= 500) {
        console.error('Error en el servidor. Intenta más tarde');
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se pudo conectar con el servidor. Verifica tu conexión');
    } else {
      // Ocurrió un error al configurar la petición
      console.error('Error al procesar la petición', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

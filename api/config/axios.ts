import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Configuración base para todas las peticiones
const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
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

    // Asegurar que el header de ngrok esté presente en todas las peticiones
    config.headers['ngrok-skip-browser-warning'] = 'true';
    
    return config;
  },
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Si la respuesta es HTML (página de advertencia de ngrok), rechazar
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('text/html')) {
      return Promise.reject(new Error('Error de conexión con el servidor. Por favor, intenta de nuevo.'));
    }
    
    // Devolver la respuesta completa
    return response;
  },
  (error) => {
    // Manejar errores de respuesta
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status, data } = error.response;
      
      // Si el token ha expirado o es inválido (401)
      if (status === 401) {
        // Limpiar token y redirigir a login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // Redirigir a la página de login
          window.location.href = '/auth/login';
        }
      }
      
      // Devolver un objeto de error estructurado
      return Promise.reject({
        status: 'error',
        message: data?.message || 'Error en la petición',
        data: data
      });
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      return Promise.reject({
        status: 'error',
        message: 'No se pudo conectar con el servidor. Verifica tu conexión y la URL del servidor',
        data: null
      });
    } else {
      // Ocurrió un error al configurar la petición
      return Promise.reject({
        status: 'error',
        message: error.message || 'Error al procesar la petición',
        data: null
      });
    }
  }
);

export default axiosInstance;

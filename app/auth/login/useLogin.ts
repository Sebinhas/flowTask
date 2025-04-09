import { LoginData } from "@/api/services/auth/login";
import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', data);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
};

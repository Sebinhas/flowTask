import  { RegisterData, registerUser } from '@/api/services/auth/register';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

export const useRegister = () =>{
    const [validatePassword, setValidatePassword] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleRegister = async (data: RegisterData) => {  

        setIsLoading(true);
        try {
            const response = await registerUser(data);
            if (response.success) {
                toast.success('Usuario registrado correctamente');
            } else {
                toast.error(response.message || 'Error al registrar usuario');
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Error al registrar usuario');
        } finally {
            setIsLoading(false);
        }
    }
    return {
        handleRegister,
        validatePassword,
        setValidatePassword,
        isLoading
    }
}
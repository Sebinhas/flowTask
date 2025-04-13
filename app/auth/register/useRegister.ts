import  { RegisterData, registerUser } from '@/api/services/auth/register';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

export const useRegister = () =>{
    const [validatePassword, setValidatePassword] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (data: any) => {  
        setIsLoading(true);
        try {
            // Validar que las contraseñas coincidan
            if (data.password !== data.confirmPassword) {
                toast.error("Las contraseñas no coinciden");
                setIsLoading(false);
                return;
            }

            const { confirmPassword, ...registerData } = data;
            
            const response = await registerUser(registerData);
            console.log('response', response)
            if (response.data.status == "success") {
                toast.success(response.message);
                router.push("/auth/login");
            } else {
                toast.error(response.message || 'Error al registrar usuario2');
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
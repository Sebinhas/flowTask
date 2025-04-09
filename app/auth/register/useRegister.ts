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
            if(response.success){
                toast.success('Usuario registrado correctamente');
                router.push('/auth/login');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error al registrar usuario');
        }
    }
    return {
        handleRegister,
        validatePassword,
        setValidatePassword
    }
}
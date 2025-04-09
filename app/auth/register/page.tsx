"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import { useForm } from 'react-hook-form'
import { registerUser } from "@/api/services/auth/register"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Utilizar useForm para manejar el formulario
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  // Acceder al valor actual de la contraseña para validación
  const password = watch("password");

  const onSubmit = async (data: any) => {
    // Validar que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    try {
      // Llamar al servicio de registro
      const response = await registerUser({
        full_name: data.name,
        email: data.email,
        password: data.password
      });

      if (response.success) {
        toast.success(response.message || "Registro exitoso");
        router.push("/dashboard");
      } else {
        toast.error(response.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-right"/>
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Layers className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-primary-dark">FlowTask</span>
      </Link>

      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-center text-primary-dark">Crear una cuenta</CardTitle>
          <CardDescription className="text-center">Ingresa tu información para comenzar con FlowTask</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-center block">Nombre completo</Label>
              <Input
                id="name"
                placeholder="Juan Pérez"
                className={errors.name ? "border-red-500" : ""}
                {...register("name", { 
                  required: true,
                  minLength: 3
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-center block">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                className={errors.email ? "border-red-500" : ""}
                {...register("email", { 
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-center block">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={errors.password ? "border-red-500" : ""}
                {...register("password", { 
                  required: true,
                  minLength: 6
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-center block">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={errors.confirmPassword ? "border-red-500" : ""}
                {...register("confirmPassword", { 
                  required: true,
                  validate: value => value === password
                })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Iniciar sesión
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


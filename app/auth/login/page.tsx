"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLogin }  from "./useLogin"
import { useForm } from "react-hook-form"
import { Toaster } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { login, showPassword, setShowPassword, passwordRequirements } = useLogin()
  
  // Configurar useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true)
      await login(data)
    } catch (error) {
      console.error('Error en login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-right"/>
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Layers className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-primary-dark">FlowTask</span>
      </Link>

      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-center text-primary-dark">Bienvenido de nuevo</CardTitle>
          <CardDescription className="text-center">Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-left block">Correo electrónico</Label>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-center block">Contraseña</Label>
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                  {...register("password", { 
                    required: true,
                    minLength: passwordRequirements.minLength,
                    validate: {
                      hasUpperCase: value => passwordRequirements.hasUpperCase.test(value) || "Debe contener al menos una letra mayúscula",
                      hasLowerCase: value => passwordRequirements.hasLowerCase.test(value) || "Debe contener al menos una letra minúscula",
                      hasNumber: value => passwordRequirements.hasNumber.test(value) || "Debe contener al menos un número",
                      hasSpecialChar: value => passwordRequirements.hasSpecialChar.test(value) || "Debe contener al menos un carácter especial"
                    }
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
            <div className="text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


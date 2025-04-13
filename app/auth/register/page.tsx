"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Layers, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import { useForm } from 'react-hook-form'
import { useRegister } from "./useRegister"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const password = watch("password");
  const { handleRegister } = useRegister();

  const passwordRequirements = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
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
        <form onSubmit={handleSubmit(handleRegister)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-left block">Nombre completo</Label>
              <Input
                id="full_name"
                placeholder="Juan Pérez"
                className={errors.full_name ? "border-red-500" : ""}
                {...register("full_name", { 
                  required: true,
                  minLength: 3
                })}
              />
            </div>
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
              <Label htmlFor="password" className="text-left block">Contraseña</Label>
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
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>La contraseña debe cumplir con:</p>
                <ul className="list-disc list-inside">
                  <li className={password?.length >= passwordRequirements.minLength ? "text-green-500" : ""}>
                    Al menos {passwordRequirements.minLength} caracteres
                  </li>
                  <li className={passwordRequirements.hasUpperCase.test(password || "") ? "text-green-500" : ""}>
                    Al menos una letra mayúscula
                  </li>
                  <li className={passwordRequirements.hasLowerCase.test(password || "") ? "text-green-500" : ""}>
                    Al menos una letra minúscula
                  </li>
                  <li className={passwordRequirements.hasNumber.test(password || "") ? "text-green-500" : ""}>
                    Al menos un número
                  </li>
                  <li className={passwordRequirements.hasSpecialChar.test(password || "") ? "text-green-500" : ""}>
                    Al menos un carácter especial (!@#$%^&*(),.?":{}|&lt;&gt;)
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-left block">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                  {...register("confirmPassword", { 
                    required: true,
                    validate: value => value === password || "Las contraseñas no coinciden"
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
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

 